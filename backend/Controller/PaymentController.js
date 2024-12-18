const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  
const Transaction=require("../Models/TransactionModel")
  const ProductPayment = async (req, res) => {
    const { email, cart } = req.body;
  
    const origin = req.headers.origin;
  
    try {
      const lineItems = cart.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: item.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email,
        line_items: lineItems,
        mode: 'payment',
        success_url: `${origin}/success`,
        cancel_url: `${origin}/cancel`,
      });
  
      // Save successful transaction details to MongoDB
      const transaction = new Transaction({
        email,
        cart,
        sessionId: session.id,
        status: 'success',
      });
      await transaction.save();
  
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Stripe session creation error:', error);
  
      // Save failed transaction details to MongoDB
      const transaction = new Transaction({
        email,
        cart,
        sessionId: null, // No session ID for failed transactions
        status: 'failed',
        error: error.message,
      });
      await transaction.save();
  
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  };

  const getTransactions=async(req,res)=>{
    try {
        const transactions = await Transaction.find(); // Fetch all transactions
        res.json(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
      }
  }


module.exports={ProductPayment,getTransactions}