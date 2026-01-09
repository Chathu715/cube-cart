"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoPerson, IoMail, IoPhonePortrait, IoLocation, IoLockClosed, IoSave, IoReceipt, IoCheckmarkCircle, IoAlert } from "react-icons/io5";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        updateUser(data.data);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setEditing(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Update failed' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-gray-400">Manage your profile and view your orders</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-yellow-400 text-black'
                  : 'glass hover:bg-white/10'
              }`}
            >
              <IoPerson className="inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => router.push('/account/orders')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-yellow-400 text-black'
                  : 'glass hover:bg-white/10'
              }`}
            >
              <IoReceipt className="inline mr-2" />
              Orders
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="glass-strong rounded-2xl p-8">
              {/* Message */}
              {message.text && (
                <div className={`mb-6 p-4 glass rounded-lg border ${
                  message.type === 'success'
                    ? 'border-green-400/30 bg-green-400/10'
                    : 'border-red-400/30 bg-red-400/10'
                }`}>
                  <div className={`flex items-center gap-2 ${
                    message.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {message.type === 'success' ? <IoCheckmarkCircle className="text-xl" /> : <IoAlert className="text-xl" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        disabled={!editing}
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        <IoMail className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 glass rounded-lg outline-none bg-white/5 opacity-50 cursor-not-allowed"
                        title="Email cannot be changed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        <IoPhonePortrait className="inline mr-2" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    <IoLocation className="inline mr-2" />
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-gray-300">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="123 Main St"
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="New York"
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="NY"
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="10001"
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="United States"
                        className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {!editing ? (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="px-6 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-green-400 text-black rounded-full font-bold hover:bg-green-300 transition disabled:opacity-50 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <IoSave />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setMessage({ type: '', text: '' });
                          // Reset form to original user data
                          if (user) {
                            setFormData({
                              name: user.name || '',
                              email: user.email || '',
                              phone: user.phone || '',
                              street: user.address?.street || '',
                              city: user.address?.city || '',
                              state: user.address?.state || '',
                              zipCode: user.address?.zipCode || '',
                              country: user.address?.country || '',
                            });
                          }
                        }}
                        className="px-6 py-3 glass rounded-full font-bold hover:bg-white/10 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Orders Tab - Handled by navigation */}
          {activeTab === 'orders' && null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
