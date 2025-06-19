require('dotenv').config();
const Stripe = require('stripe');
const { User } = require('../database/models');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    const userId = req.user.userId
    try {
        const user = await User.findOne({ where: { id: userId } })

        let customerId = user.stripeCustomerId;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: { userId: user.id }
            });

            customerId = customer.id
            await user.update({ stripeCustomerId: customerId })
        }
        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1
                }
            ],
            customer: customerId,
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
            cancel_url : `${process.env.FRONTEND_URL}/payment-cancel`
        });
        res.json({ url: session.url })

    } catch (error) {
        console.error('Stripe session error:', error);
        res.status(500).json({ message: 'Failed to create checkout session', error: error.message });
    }
}

module.exports = {
    createCheckoutSession
}