require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PaymentRoute = require('./Routes/Payment');
const WebhookRoute = require('./Routes/Webhook');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
 // Parse JSON for non-webhook routes

// Use raw body parser specifically for the Stripe webhook route
app.use(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  WebhookRoute
);
app.use(bodyParser.json());
// Routes
app.use('/product', PaymentRoute);

// Start the server
mongoose
  .connect(process.env.MONGO_URL, { dbName: 'payment_database' })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server running on port ' + PORT);
    });
  })
  .catch((err) => {
    console.log(err + ' did not connect');
  });
