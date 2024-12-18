import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'; 


const Check = () => {
  const cart = useSelector((state) => state.myslice.cart);

  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  console.log(cart)

const totalPrice = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle checkout form submission
    try {
        // Send checkout details to backend using axios
        const response = await axios.post('/create-checkout-session', {
          email,
          cart,
        });
    
        const session = response.data;
    
        // Load Stripe and redirect to Checkout
        const stripe = await loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    
        if (error) {
          console.error('Error during Stripe Checkout:', error);
        }
      } catch (error) {
        console.error('Error during checkout process:', error);
      }
    // Optionally, clear cart or send order details to an API
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <Form onSubmit={handleSubmit}>
        {/* Email input */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        
        <Form.Group controlId="paymentMethod" className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            as="select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </Form.Control>
        </Form.Group>

        {/* Credit Card details */}
        {paymentMethod === 'credit-card' && (
          <>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="cardNumber" className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="expiryDate" className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="cvv" className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        {/* Billing Address */}
        <Form.Group controlId="billingAddress" className="mb-3">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your billing address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            required
          />
        </Form.Group>

        {/* Order Summary */}
        <h4>Total Price: ${totalPrice}</h4>

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default Check;