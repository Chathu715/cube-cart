"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { IoArrowBack, IoCube, IoSearch, IoFilter, IoEye } from "react-icons/io5";

interface Order {
  _id: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  paymentStatus: string;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    let result = orders;
    
    if (searchTerm) {
      result = result.filter(order => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(order => order.orderStatus === statusFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
        setFilteredOrders(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-400/20 text-yellow-400',
      processing: 'bg-blue-400/20 text-blue-400',
      shipped: 'bg-purple-400/20 text-purple-400',
      delivered: 'bg-green-400/20 text-green-400',
      cancelled: 'bg-red-400/20 text-red-400',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${styles[status] || 'bg-gray-500/20 text-gray-400'}`}>
        {status}
      </span>
    );
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="animated-gradient min-h-screen">
      <header className="glass-strong border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 glass rounded-lg hover:bg-white/10 transition">
              <IoArrowBack className="text-xl" />
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <IoCube className="text-blue-400" />
              Manage Orders
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search orders by ID, email, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition bg-white/5"
            />
          </div>
          
          <div className="relative">
             <IoFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
             <select
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="pl-10 pr-8 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-white/5 appearance-none"
             >
               <option value="all">All Statuses</option>
               <option value="pending">Pending</option>
               <option value="processing">Processing</option>
               <option value="shipped">Shipped</option>
               <option value="delivered">Delivered</option>
               <option value="cancelled">Cancelled</option>
             </select>
          </div>
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-4 font-semibold">Order ID</th>
                <th className="text-left p-4 font-semibold">Customer</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Total</th>
                <th className="text-left p-4 font-semibold">Payment</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-400">Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-400">No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4 font-mono text-sm text-gray-300">{order._id.substring(0, 8)}...</td>
                    <td className="p-4">
                      <p className="font-semibold text-sm">{order.userName}</p>
                      <p className="text-xs text-gray-400">{order.userEmail}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-sm">${order.totalAmount.toFixed(2)}</td>
                    <td className="p-4">
                       <span className={`text-xs ${order.paymentStatus === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                         {order.paymentStatus}
                       </span>
                    </td>
                    <td className="p-4">{getStatusBadge(order.orderStatus)}</td>
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="p-2 glass rounded-lg hover:bg-white/10 transition inline-flex text-blue-400"
                        title="View Details"
                      >
                        <IoEye />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
