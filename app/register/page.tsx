"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoMail, IoLockClosed, IoPerson, IoPhonePortrait, IoPersonAdd, IoAlert, IoCheckmarkCircle } from "react-icons/io5";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.phone);
      router.push("/"); // Redirect to home after successful registration
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
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
              <IoPersonAdd className="text-6xl text-yellow-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-400">Join CubeCart and start shopping!</p>
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

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <IoPerson className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                  placeholder="John Doe"
                />
              </div>

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
                  <IoPhonePortrait className="inline mr-2" />
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                  placeholder="+1 234 567 8900"
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
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <IoCheckmarkCircle className="inline mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
                  placeholder="Re-enter password"
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <IoPersonAdd />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-yellow-400 hover:underline font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
