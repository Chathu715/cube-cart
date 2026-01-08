"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { IoStar, IoCart, IoSearch } from "react-icons/io5";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "all") params.append("category", category);
      if (search) params.append("search", search);

      const res = await fetch(`/api/products?${params}`);
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "Electronics", "Photography", "Fashion", "Home"];

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            CubeCart 3D
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience products in a whole new dimension
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto glass-strong rounded-full p-2 flex items-center gap-2">
            <IoSearch className="text-gray-400 ml-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProducts()}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none px-2 py-2"
            />
            <button
              onClick={fetchProducts}
              className="px-6 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                category === cat
                  ? "bg-yellow-400 text-black"
                  : "glass hover:bg-white/10"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="glass-strong rounded-2xl overflow-hidden hover:scale-105 transition-transform group"
              >
                {product.images[0] && (
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <IoStar className="text-yellow-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-400">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <button className="w-full mt-4 py-3 bg-yellow-400/20 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400/30 transition">
                    View in 3D →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12 glass-strong rounded-2xl max-w-md mx-auto">
            <p className="text-xl text-gray-400">No products found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
