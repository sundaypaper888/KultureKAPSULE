
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const PRINTIFY_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImY4NjNmNTFhOWZlYzI2OTRjNmRjNTczMDUyNzg0Zjg5ODAxMzEwYTI1MTA0M2YyZTY3OTdhY2E1NjQ3ZjVlZjE1ZTM5OTVkOTQ3Yjg1YTViIiwiaWF0IjoxNzgyNjg5NzM1LjgyNzcwNSwibmJmIjoxNzgyNjg5NzM1LjgyNzcwNywiZXhwIjoxODE0MjI1NzM1LjgyMjQ3Mywic3ViIjoiOTQ0ODMyOSIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiLCJ1c2VyLmluZm8iXX0.PrUFcWYlsLVdW22HlUTPMUtNNkaZa9A3kdHVkiHCbNuADQ692Uip3adwUa1hWmp99Ce3R5UUGDjInKDh59E5P7ZE-D6_yD0QWEV2Qo3_tTGdx-1SDSwdgi-ugZ6jZo_FC4v6E3aU0YV_Nh_p2QN23cJ-W_SZNMq-i5VBxjGB_HH1f2dEBRsPOdVt52ji8gVjevu3NmRneVwLxhbku0CN-gRpeRWEnD-vbFXX6qmpx1CW7hC_QXHmww2WUvCuuYpqBylaZu8d4I6BENmsuwRR5XxSqjcxfVXjGitpLriRLYt64UArCc1n1yXGxCuTQcRt3Gv_-Y3qz4fWWuyfDPMs-iac5GXO3Imiv2ZlbAHj-sbu4lxC4qpQt78NuIKIijdGcwGR1TwCRIj5ZVUId4RnT-d2DAMNc0fBQE_JVh3muM4oJaC57oqfXeU9b95pW0kM6B2rR3oXFsqM9QUiFX-TE4MneqUf9YtaJ1t8RQA8MXKM3wssH4MiElGM8Cf7FdAkBkTEXaipvgCcxkwR9KsFyzz_g1Ab9cs9hoq72CbE8DnCK2TFogS0IMSYH2vY3qhy31Z5G5-obX9zby1JWCC79RDqFdckat2dT76kFE7wmsWUJTPzjko8u5cxKUBdKmxJVaPtqb2izbQt39llD_C5dxiL4WJ-Y15aMV1bW4ZvJVs';
const SHOP_ID = '9827741';
const BLUEPRINT_SINGLE = 928;
const BLUEPRINT_TRIPTYCH = 961;
const PRINT_PROVIDER_ID = 104;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_o17TbGMCRNh9eqCZBkB0jA7LbS1VZxP9';

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Retrieve the session with line items expanded to get metadata
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product'],
      });

      const lineItems = sessionWithLineItems.line_items?.data || [];
      const shippingAddress = session.shipping_details?.address;
      const customerName = session.shipping_details?.name || 'Customer';
      const nameParts = customerName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Customer';

      const printifyLineItems = lineItems.map((item: any) => {
        const product = item.price.product as Stripe.Product;
        const metadata = product.metadata || {};
        
        let blueprintId = BLUEPRINT_SINGLE;
        let variantId = 78325; // Default 12x12
        let quantity = item.quantity;

        if (metadata.type === 'triptych') {
          blueprintId = BLUEPRINT_TRIPTYCH;
          variantId = 78407; // 36x12 Horizontal Triptych
          quantity = item.quantity; // Blueprint 961 is the triptych itself, so quantity 1
        } else if (metadata.category === 'Movie Scenes') {
          variantId = 78321; // 24x36 Vertical (Premium Large)
        }

        return {
          blueprint_id: blueprintId,
          print_provider_id: PRINT_PROVIDER_ID,
          variant_id: variantId,
          quantity: quantity,
          print_areas: {
            front: metadata.image_url || product.images[0],
          },
        };
      });

      const printifyOrder = {
        external_id: session.id,
        line_items: printifyLineItems,
        shipping_method: 1,
        send_shipping_notification: true,
        address_to: {
          first_name: firstName,
          last_name: lastName,
          email: session.customer_details?.email,
          phone: session.customer_details?.phone || '',
          country: shippingAddress?.country || 'US',
          region: shippingAddress?.state || '',
          address1: shippingAddress?.line1 || '',
          address2: shippingAddress?.line2 || '',
          city: shippingAddress?.city || '',
          zip: shippingAddress?.postal_code || '',
        },
      };

      try {
        const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/orders.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRINTIFY_KEY}`,
          },
          body: JSON.stringify(printifyOrder),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Printify Order Creation Failed:', data);
        } else {
          console.log('Printify Order Created Successfully:', data.id);
        }
      } catch (error) {
        console.error('Error calling Printify API:', error);
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
