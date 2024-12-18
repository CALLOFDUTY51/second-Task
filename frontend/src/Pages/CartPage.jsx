import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { incrementQuantity, decrementQuantity, deleteCart } from "../redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myslice.cart);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Stripe publishable key
  const stripePromise = loadStripe("pk_test_51QXAuJ01G69PQEFojIUffY8BqGkPBnjFNo2anVoK97lt9ZOtuYnjZZoe0XhFy4BgnB634LuJHBHROOENTkiXRlwL000aEEXjtC"); // Replace with your Stripe publishable key

  const handleCheckout = () => {
    setShowModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
  };

  const handleProceed = async () => {
    if (!email) {
      alert("Please enter your email!");
      return;
    }

    try {
      // Create a checkout session on the backend
      const response = await axios.post("http://localhost:5000/product/payment", {
        email,
        cart,
      });

      const { sessionId } = response.data;

      // Load Stripe and redirect to checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe Checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("An error occurred while processing your checkout. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      style={{ marginLeft: "5px" }}
                    >
                      -
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(deleteCart(item.id))}
                      style={{ marginLeft: "5px" }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <h4>Total Price: ${totalPrice}</h4>
            <Button variant="primary" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <h4>Your cart is empty.</h4>
      )}

      {/* Modal for Email Input */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Enter Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProceed}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
