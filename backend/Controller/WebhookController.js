const Transaction = require('../Models/TransactionModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const statusChange = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = 'whsec_c1b7a104f93793d757d71dfcee097958b4d960fb3d0e677dae9cb835e5642570'; // Replace with your Stripe webhook signing secret

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

   

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        console.log(paymentIntent.id)

        // Find the transaction by the PaymentIntent ID (sessionId was saved with session creation)
        try {
            const transaction = await Transaction.findOne({ sessionId: paymentIntent.id });
            if (transaction) {
                // Update status to success if transaction is found
                transaction.status = 'success';
                await transaction.save();
                console.log('Transaction marked as completed:', paymentIntent.id);
            } else {
                console.log('Transaction not found for paymentIntent:', paymentIntent.id);
            }
        } catch (dbError) {
            console.error('Database update error:', dbError);
        }
    } 

    res.json({ received: true });
}




module.exports={statusChange}