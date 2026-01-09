"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { IoArrowBack, IoCube, IoSave, IoLocation, IoPerson, IoCard } from "react-icons/io5";

export default function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchOrder();
  }, [isAuthenticated, resolvedParams.id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${resolvedParams.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
        setStatus(data.data.orderStatus);
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found</div>;

  return (
    <div className="animated-gradient min-h-screen">
      <header className="glass-strong border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/orders" className="p-2 glass rounded-lg hover:bg-white/10 transition">
              <IoArrowBack className="text-xl" />
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <IoCube className="text-blue-400" />
              Order Details
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 p-3 glass rounded-xl">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden relative flex-shrink-0">
                      <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p className="text-sm text-gray-400">${item.price} x {item.quantity}</p>
                    </div>
                    <div className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-2xl font-bold text-yellow-400">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <IoLocation className="text-yellow-400" />
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <p className="text-sm text-gray-400">Address</p>
                   <p className="font-medium">{order.shippingAddress.street}</p>
                </div>
                <div>
                   <p className="text-sm text-gray-400">City / State</p>
                   <p className="font-medium">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                </div>
                <div>
                   <p className="text-sm text-gray-400">Country / Zip</p>
                   <p className="font-medium">{order.shippingAddress.country} - {order.shippingAddress.zipCode}</p>
                </div>
                <div>
                   <p className="text-sm text-gray-400">Phone</p>
                   <p className="font-medium">{order.shippingAddress.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Order Status</h2>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-white/5 mb-4"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Status"}
              </button>
            </div>

            {/* Customer Card */}
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <IoPerson className="text-blue-400" />
                Customer
              </h2>
              <div className="space-y-2">
                <p className="font-semibold">{order.userName}</p>
                <p className="text-sm text-gray-400">{order.userEmail}</p>
                <p className="text-xs text-gray-500 font-mono">ID: {order.userId}</p>
              </div>
            </div>

            {/* Payment Info */}
             <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <IoCard className="text-green-400" />
                Payment
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                   <span className="text-gray-400">Method</span>
                   <span className="font-medium capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-gray-400">Status</span>
                   <span className={`font-medium capitalize ${order.paymentStatus === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                     {order.paymentStatus}
                   </span>
                </div>
                <div className="pt-2">
                   <p className="text-xs text-gray-500 mb-1">Payment Intent ID:</p>
                   <p className="text-xs font-mono break-all bg-black/20 p-2 rounded">{order.stripePaymentIntentId}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
