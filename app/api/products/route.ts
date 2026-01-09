import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/Product';
import { getAdminFromRequest } from '@/app/lib/auth';

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
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let products = await Product.find(query);

    // If no products exist, seed some sample data
    if (products.length === 0 && !search && !category) {
      const sampleProducts = [
        {
          name: "Wireless Headphones Pro",
          description: "Premium noise-cancelling headphones with 30-hour battery life",
          price: 299.99,
          category: "Electronics",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
          ],
          features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Premium sound quality",
            "Comfortable over-ear design",
            "Bluetooth 5.0"
          ],
          specifications: {
            brand: "AudioTech",
            model: "WH-Pro-2024",
            color: "Midnight Black",
            weight: "250g",
            bluetooth: "5.0"
          },
          stock: 45,
          rating: 4.8,
          reviews: 1250
        },
        {
          name: "Smart Watch Ultra",
          description: "Advanced fitness tracking smartwatch with AMOLED display",
          price: 449.99,
          category: "Electronics",
          images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
          ],
          features: [
            "AMOLED Display",
            "Heart rate monitoring",
            "GPS tracking",
            "Water resistant (50m)",
            "7-day battery life"
          ],
          specifications: {
            brand: "TechFit",
            model: "Ultra-2024",
            color: "Space Gray",
            display: "1.4 inch AMOLED",
            waterResistance: "50m"
          },
          stock: 32,
          rating: 4.6,
          reviews: 892
        },
        {
          name: "Professional Camera Lens",
          description: "High-quality 50mm f/1.8 prime lens for professional photography",
          price: 599.99,
          category: "Photography",
          images: [
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=500&fit=crop"
          ],
          features: [
            "50mm focal length",
            "f/1.8 maximum aperture",
            "Fast autofocus",
            "Weather sealed",
            "Premium glass elements"
          ],
          specifications: {
            brand: "LensPro",
            model: "50mm-f1.8",
            focalLength: "50mm",
            aperture: "f/1.8",
            weight: "420g"
          },
          stock: 18,
          rating: 4.9,
          reviews: 543
        }
      ];

      await Product.insertMany(sampleProducts);
      products = await Product.find(query);
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

  // Check admin authorization
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }

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
