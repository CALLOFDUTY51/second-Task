import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { incrementQuantity, decrementQuantity, deleteCart } from "../redux/cartSlice"; // Import actions from your slice
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myslice.cart);
const navigate=useNavigate()
  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

const goToCheckOut=()=>{
    navigate("/Check")
}

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
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <button onClick={goToCheckOut} className="button-custom" onC variant="primary" size="lg">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <h4>Your cart is empty.</h4>
      )}
    </div>
  );
};

export default CartPage;
