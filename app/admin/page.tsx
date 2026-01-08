"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLockClosed, IoKey } from "react-icons/io5";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple password authentication (in production, use proper auth)
  const ADMIN_PASSWORD = "cubecart-admin-2026"; // Change this in production!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple client-side check (in production, verify server-side)
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("cubecart_admin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password");
      setLoading(false);
    }
  };

  return (
    <div className="animated-gradient min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass-strong rounded-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <IoLockClosed className="text-6xl text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter password to access admin panel</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <IoKey className="inline mr-2" />
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                placeholder="Enter admin password"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 glass rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              For demo purposes, password is: <span className="text-yellow-400 font-mono">cubecart-admin-2026</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
