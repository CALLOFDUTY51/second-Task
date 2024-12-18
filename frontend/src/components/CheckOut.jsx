import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
        items: cartItems,
        email,
      });
      // Redirect to Stripe Checkout URL
      navigate(`/redirecting?url=${encodeURIComponent(data.url)}`);
    } catch (err) {
      console.error('Checkout error:', err);
      navigate('/payment-failed');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleCheckout} disabled={!email}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Checkout;
