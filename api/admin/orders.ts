import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export default async function handler(req: any, res: any) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'DRAGON8828';
  const providedPassword = req.headers['x-admin-password'];

  if (!adminPassword || providedPassword !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Expand line_items to get product details
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ['data.line_items'],
    });

    const orders = sessions.data.map(session => ({
      id: session.id,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      status: session.payment_status,
      customer: session.customer_details?.name,
      email: session.customer_details?.email,
      created: session.created,
      shipping: session.shipping_details?.address,
      items: session.line_items?.data.map(item => ({
        title: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100,
      })) || [],
    }));

    res.status(200).json({ orders });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
