import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let products = await Product.find(query).sort({ createdAt: -1 });

    // SEED DATA: If DB is empty, create sample products
    if (products.length === 0 && !category && !search) {
      const sampleProducts = [
        {
          name: "Wireless Headphones Pro",
          description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
          price: 299.99,
          category: "Electronics",
          images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
          features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Bluetooth 5.0",
            "Premium sound quality"
          ],
          specifications: {
            brand: "AudioTech",
            color: "Black",
            weight: "250g"
          },
          stock: 50,
          rating: 4.5,
          reviews: 128
        },
        {
          name: "Smart Watch Ultra",
          description: "Advanced fitness tracking with health monitoring features",
          price: 399.99,
          category: "Electronics",
          images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
          features: [
            "Heart rate monitoring",
            "GPS tracking",
            "Water resistant",
            "7-day battery"
          ],
          specifications: {
            brand: "TechWear",
            color: "Space Gray",
            display: "AMOLED"
          },
          stock: 30,
          rating: 4.8,
          reviews: 89
        },
        {
          name: "Premium Camera Lens",
          description: "Professional 50mm f/1.8 lens for stunning photography",
          price: 549.99,
          category: "Photography",
          images: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500"],
          features: [
            "50mm focal length",
            "f/1.8 aperture",
            "Ultra-sharp optics",
            "Weather sealed"
          ],
          specifications: {
            brand: "LensMaster",
            mount: "Universal",
            weight: "600g"
          },
          stock: 15,
          rating: 4.9,
          reviews: 45
        }
      ];

      await Product.insertMany(sampleProducts);
      products = await Product.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
