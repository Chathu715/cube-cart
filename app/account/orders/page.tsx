"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { IoCube, IoTime, IoCheckmarkCircle, IoCloseCircle, IoAirplane } from "react-icons/io5";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  items: OrderItem[];
}

export default function MyOrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('cubecart_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400';
      case 'shipped': return 'text-blue-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <IoCheckmarkCircle className="text-xl" />;
      case 'shipped': return <IoAirplane className="text-xl" />;
      case 'cancelled': return <IoCloseCircle className="text-xl" />;
      default: return <IoTime className="text-xl" />;
    }
  };

  if (!isAuthenticated()) {
     return (
        <div className="animated-gradient min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="glass-strong p-8 rounded-2xl text-center">
                    <p className="mb-4">Please login to view your orders</p>
                    <Link href="/login" className="text-yellow-400 hover:underline">Login here</Link>
                </div>
            </main>
            <Footer />
        </div>
     )
  }

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <IoCube className="text-yellow-400" />
          My Orders
        </h1>

        {loading ? (
          <div className="text-center py-12">
             <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="glass-strong rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-lg mb-6">You haven't placed any orders yet.</p>
            <Link 
              href="/"
              className="px-6 py-2 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="glass-strong rounded-xl p-6 hover:bg-white/5 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="font-mono text-sm">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="font-bold text-lg">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    <span className="font-bold uppercase text-sm">{order.orderStatus}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{item.quantity}x</span>
                        <span>{item.productName}</span>
                      </div>
                      <span className="text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
