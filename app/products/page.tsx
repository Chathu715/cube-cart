"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoGrid, IoCart, IoStar, IoSearch } from "react-icons/io5";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const query = selectedCategory !== "all" ? `?category=${selectedCategory}` : "";
      const res = await fetch(`/api/products${query}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["all", "Electronics", "Photography", "Audio", "Accessories"];

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <IoGrid className="inline text-yellow-400 mr-3" />
            All Products
          </h1>
          <p className="text-xl text-gray-400">
            Explore our 3D interactive product showcase
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-full outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/5"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-black"
                    : "glass hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-400">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <IoGrid className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="glass-strong rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Stock Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock > 10
                        ? "bg-green-400/20 text-green-400 border border-green-400/30"
                        : "bg-orange-400/20 text-orange-400 border border-orange-400/30"
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </div>

                  {/* Image Count Badge (if multiple images) */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      {product.images.length} images
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <div className="text-xs text-yellow-400 font-semibold mb-2">
                    {product.category}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <IoStar
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold group-hover:bg-yellow-400 group-hover:text-black transition">
                      View 3D
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredProducts.length > 0 && (
          <div className="text-center mt-12 text-gray-400">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
