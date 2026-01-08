import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import User from '@/app/lib/models/User';
import { getUserFromRequest } from '@/app/lib/auth';

export async function PUT(request: Request) {
  await dbConnect();

  // Get authenticated user
  const authUser = getUserFromRequest(request);
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { name, phone, street, city, state, zipCode, country } = await request.json();

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      authUser.userId,
      {
        name,
        phone,
        address: {
          street,
          city,
          state,
          zipCode,
          country,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Profile update failed' },
      { status: 500 }
    );
  }
}
