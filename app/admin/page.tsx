"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { IoGrid, IoCart, IoPersonCircle, IoLogOut, IoSettings, IoCube, IoBarChart } from "react-icons/io5";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchStats();
  }, [isAuthenticated, user, router]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setStats(prev => ({ ...prev, totalProducts: data.data.length }));
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user || user.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="animated-gradient min-h-screen">
      <header className="glass-strong border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <IoCube className="text-yellow-400" />
                <span>CubeCart</span>
                <span className="text-sm px-3 py-1 bg-yellow-400 text-black rounded-full font-bold">ADMIN</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <IoPersonCircle className="text-2xl text-yellow-400" />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition flex items-center gap-2"
              >
                <IoLogOut />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-400">Products</h3>
              <IoGrid className="text-3xl text-yellow-400" />
            </div>
            <p className="text-4xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-400">Orders</h3>
              <IoCart className="text-3xl text-blue-400" />
            </div>
            <p className="text-4xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-400">Users</h3>
              <IoPersonCircle className="text-3xl text-green-400" />
            </div>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-400">Revenue</h3>
              <IoBarChart className="text-3xl text-purple-400" />
            </div>
            <p className="text-4xl font-bold">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/admin/products"
              className="glass-strong rounded-2xl p-6 hover:bg-white/10 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-yellow-400/20 rounded-xl group-hover:bg-yellow-400/30 transition">
                  <IoGrid className="text-3xl text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Manage Products</h3>
                  <p className="text-sm text-gray-400">Add, edit, or delete products</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="glass-strong rounded-2xl p-6 hover:bg-white/10 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-400/20 rounded-xl group-hover:bg-blue-400/30 transition">
                  <IoCart className="text-3xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Manage Orders</h3>
                  <p className="text-sm text-gray-400">View and update order status</p>
                </div>
              </div>
            </Link>

            <div className="glass-strong rounded-2xl p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-400/20 rounded-xl">
                  <IoSettings className="text-3xl text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Settings</h3>
                  <p className="text-sm text-gray-400">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
