import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/Order';
import { getUserFromRequest } from '@/app/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let orders;
    if (user.role === 'admin') {
      orders = await Order.find().sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ userId: user.userId }).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
