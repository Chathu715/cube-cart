"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import { IoShieldCheckmark, IoCart, IoArrowBack } from "react-icons/io5";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [isLoading, setIsLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  useEffect(() => {
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          shipping: {
            name: shippingInfo.name,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zip,
              country: shippingInfo.country,
            },
          },
        }),
      });

      const data = await res.json();

      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep(2);
      } else {
        alert("Failed to initialize payment: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    // Save order to DB via API (optional if webhook handles it, but good for immediate feedback)
    clearCart();
    router.push("/checkout/success");
  };

  const total = getCartTotal();

  if (cart.length === 0 && step === 1) {
    return (
      <div className="animated-gradient min-h-screen flex flex-col">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-12 flex-1 text-center">
          <div className="glass-strong rounded-2xl p-12 max-w-lg mx-auto">
            <IoCart className="text-6xl text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">Add some products to your cart to proceed to checkout.</p>
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition"
            >
              Browse Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#facc15',
      colorBackground: '#1f2937',
      colorText: '#f3f4f6',
      colorDanger: '#ef4444',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Form */}
            <div className="space-y-6">
              {step === 1 ? (
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm">1</span>
                    Shipping Details
                  </h2>
                  
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1 text-gray-300">Full Name</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1 text-gray-300">Address</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">City</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">State / Province</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">ZIP / Postal Code</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.zip}
                          onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Country</label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-6 py-4 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
                    >
                      {isLoading ? "Processing..." : "Continue to Payment"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="glass-strong rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm">2</span>
                      Payment
                    </h2>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                    >
                      <IoArrowBack /> Edit Shipping
                    </button>
                  </div>

                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm amount={total} onSuccess={handlePaymentSuccess} />
                    </Elements>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div>
              <div className="glass-strong rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <IoCart className="text-yellow-400" />
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4 p-3 glass rounded-xl">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden relative flex-shrink-0">
                         {/* Placeholder for Next/Image since we might not have optimization in this context easily or valid domains */}
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white pt-2">
                    <span>Total</span>
                    <span className="text-yellow-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <IoShieldCheckmark className="text-green-400" />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
