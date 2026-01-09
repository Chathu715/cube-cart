"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  IoCube, IoArrowBack, IoAdd, IoTrash, IoCreate, IoSearch,
  IoClose, IoSave, IoImages, IoCheckmark
} from "react-icons/io5";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  rating: number;
  reviews: number;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchProducts();
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Product deleted successfully!' });
        fetchProducts();
      } else {
        setMessage({ type: 'error', text: data.error || 'Delete failed' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Delete failed' });
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
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
              <Link href="/admin" className="p-2 glass rounded-lg hover:bg-white/10 transition">
                <IoArrowBack className="text-xl" />
              </Link>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <IoCube className="text-yellow-400" />
                Manage Products
              </h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition flex items-center gap-2"
            >
              <IoAdd className="text-xl" />
              Add Product
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {message.text && (
          <div className={`mb-6 p-4 glass rounded-lg border ${
            message.type === 'success'
              ? 'border-green-400/30 bg-green-400/10 text-green-400'
              : 'border-red-400/30 bg-red-400/10 text-red-400'
          }`}>
            <p>{message.text}</p>
          </div>
        )}

        <div className="mb-6">
          <div className="relative">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
            />
          </div>
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-4 font-semibold">Product</th>
                <th className="text-left p-4 font-semibold">Category</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Stock</th>
                <th className="text-left p-4 font-semibold">Images</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-400">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                            <IoImages className="text-gray-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4 font-semibold">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        product.stock > 20 ? 'bg-green-400/20 text-green-400' :
                        product.stock > 0 ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-red-400/20 text-red-400'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {product.images?.length || 0} image{product.images?.length !== 1 ? 's' : ''}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 glass rounded-lg hover:bg-white/10 transition"
                          title="Edit"
                        >
                          <IoCreate className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 glass rounded-lg hover:bg-white/10 transition"
                          title="Delete"
                        >
                          <IoTrash className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {(showAddModal || showEditModal) && (
        <ProductFormModal
          isOpen={showAddModal || showEditModal}
          isEdit={showEditModal}
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setEditingProduct(null);
            setMessage({ type: 'success', text: showEditModal ? 'Product updated!' : 'Product created!' });
            fetchProducts();
          }}
          token={token}
        />
      )}
    </div>
  );
}

interface ProductFormModalProps {
  isOpen: boolean;
  isEdit: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
  token: string | null;
}

function ProductFormModal({ isOpen, isEdit, product, onClose, onSuccess, token }: ProductFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    images: product?.images?.join('\n') || "",
    features: product?.features?.join('\n') || "",
    stock: product?.stock || 0,
    rating: product?.rating || 0,
    reviews: product?.reviews || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        images: formData.images.split('\n').filter(img => img.trim()),
        features: formData.features.split('\n').filter(f => f.trim()),
        specifications: {},
      };

      const url = isEdit ? `/api/products/${product?._id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch (error: any) {
      setError(error.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-2 glass rounded-lg hover:bg-white/10 transition">
            <IoClose className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 glass rounded-lg border border-red-400/30 bg-red-400/10 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URLs (one per line)</label>
            <textarea
              rows={3}
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5 resize-none font-mono text-sm"
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features (one per line)</label>
            <textarea
              rows={4}
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white/5 resize-none"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <IoSave />
                  {isEdit ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 glass rounded-lg font-bold hover:bg-white/10 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
