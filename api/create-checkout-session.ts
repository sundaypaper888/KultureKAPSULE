
import Stripe from 'stripe';

const stripe = new Stripe('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', {
  apiVersion: '2023-10-16' as any, // Use a stable version
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { cart } = req.body;

      // Transform cart items to Stripe line items
      const line_items = cart.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: item.artist || item.category,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      }));

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'cashapp'],
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB'],
        },
        metadata: {
          source: 'Kulture Kapsule Web',
          item_count: cart.length.toString(),
        },
      });

      res.status(200).json({ url: session.url });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
// Trigger Vercel redeploy to pick up env vars
// Final deploy - env vars ready
