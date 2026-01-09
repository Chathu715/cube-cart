"use client";

import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { IoCheckmarkCircle, IoCube } from "react-icons/io5";

export default function CheckoutSuccessPage() {
  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 flex-1 text-center">
        <div className="glass-strong rounded-2xl p-12 max-w-lg mx-auto">
          <IoCheckmarkCircle className="text-6xl text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/account/orders"
              className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
            >
              <IoCube />
              View My Orders
            </Link>
            <Link 
              href="/"
              className="px-8 py-3 glass rounded-full font-bold hover:bg-white/10 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
