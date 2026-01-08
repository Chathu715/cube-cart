"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../../components/Navigation";
import ProductCube from "../../components/ProductCube";
import Footer from "../../components/Footer";
import { IoArrowBack } from "react-icons/io5";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
  specifications: any;
  stock: number;
  rating: number;
  reviews: number;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [resolvedParams.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      const json = await res.json();
      if (json.success) {
        setProduct(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full hover:bg-white/10 transition mb-8"
        >
          <IoArrowBack /> Back to Products
        </button>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && product && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-4 py-2 glass rounded-full text-sm mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto mb-2">
                Rotate the cube to explore all product details
              </p>
            </div>

            <div className="pt-8">
              <ProductCube product={product} />
            </div>
          </div>
        )}

        {!loading && !product && (
          <div className="text-center py-20 glass-strong rounded-2xl max-w-md mx-auto">
            <p className="text-xl text-red-400">Product not found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
