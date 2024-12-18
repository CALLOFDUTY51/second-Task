// server.js

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to create Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { cart, email } = req.body; // Get the cart data and email from the frontend

  try {
    // Calculate the total price from the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        price_data: {
          currency: 'usd', // You can change this currency as needed
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.YOUR_FRONTEND_URL}/success`,
      cancel_url: `${process.env.YOUR_FRONTEND_URL}/cancel`,
      customer_email: email,
    });

    // Send the session ID to the frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
