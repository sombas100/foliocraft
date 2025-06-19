require('dotenv').config();
const Stripe = require('stripe');
const { User } = require('../database/models');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerId = session.customer;

    console.log(`✅ Payment success. Customer: ${customerId}`);

    try {
      const user = await User.findOne({ where: { stripeCustomerId: customerId } });

      if (user) {
        await user.update({ subscriptionStatus: 'PAID' });
        console.log(`🟢 User ${user.email} upgraded to Pro.`);
      } else {
        console.warn(`⚠️ No user found for Stripe customer: ${customerId}`);
      }
      console.log(`Session ID: ${session.id}`);

    } catch (err) {
      console.error('Error updating user:', err.message);
    }
  }

  
  res.status(200).json({ received: true });
};

module.exports = { handleStripeWebhook };
