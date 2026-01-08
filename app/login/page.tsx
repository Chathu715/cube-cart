"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoMail, IoLockClosed, IoLogIn, IoAlert } from "react-icons/io5";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/"); // Redirect to home after successful login
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <IoLogIn className="text-6xl text-yellow-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400">Login to your CubeCart account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 glass rounded-lg border border-red-400/30 bg-red-400/10">
                <div className="flex items-center gap-2 text-red-400">
                  <IoAlert className="text-xl flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <IoMail className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <IoLockClosed className="inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <IoLogIn />
                    Login
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-yellow-400 hover:underline font-semibold">
                  Create Account
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 glass rounded-lg">
              <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-400 space-y-1">
                <p><span className="text-yellow-400">User:</span> user@test.com / password123</p>
                <p><span className="text-yellow-400">Admin:</span> admin@test.com / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
