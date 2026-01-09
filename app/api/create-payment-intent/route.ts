import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/Product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    // Optional: Require login
    // const user = await getAuthFromRequest(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { items, shipping } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Calculate total securely on server
    let totalAmount = 0;
    
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for: ${item.name}`);
      }
      totalAmount += product.price * item.quantity;
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(totalAmount * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        shipping_name: shipping.name,
        shipping_address: JSON.stringify(shipping.address),
        cart_items: JSON.stringify(items.map((i: any) => ({
          id: i._id,
          q: i.quantity
        }))),
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Payment Intent Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
