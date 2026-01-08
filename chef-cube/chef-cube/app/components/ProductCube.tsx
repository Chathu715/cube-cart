"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoStar, IoCart, IoInformationCircle, IoPricetag, IoCheckmarkCircle } from "react-icons/io5";

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

interface ProductCubeProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCube({ product, onAddToCart }: ProductCubeProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") rotate("right");
      if (e.key === "ArrowLeft") rotate("left");
      if (e.key === "ArrowUp") rotate("up");
      if (e.key === "ArrowDown") rotate("down");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotation]);

  const rotate = (direction: "left" | "right" | "up" | "down") => {
    setRotation((prev) => {
      let { x, y } = prev;
      switch (direction) {
        case "right": y -= 90; break;
        case "left": y += 90; break;
        case "up": x += 90; break;
        case "down": x -= 90; break;
      }
      return { x, y };
    });
  };

  const cubeSize = isMobile ? 280 : 350;
  const translateZ = cubeSize / 2;

  return (
    <div className="relative">
      <div
        className="scene-container relative mx-auto"
        style={{
          width: `${cubeSize}px`,
          height: `${cubeSize}px`
        }}
      >
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateX: rotation.x, rotateY: rotation.y }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT - Product Image & Name */}
          <Face transform={`rotateY(0deg) translateZ(${translateZ}px)`} label="Main" size={cubeSize}>
            <div className="space-y-4">
              {product.images[0] && (
                <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <div className="flex items-center justify-center gap-2">
                <IoStar className="text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>
          </Face>

          {/* RIGHT - Features */}
          <Face transform={`rotateY(90deg) translateZ(${translateZ}px)`} label="Features" size={cubeSize}>
            <div className="space-y-3 text-left w-full">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <IoCheckmarkCircle className="text-green-400" /> Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Face>

          {/* BACK - Description */}
          <Face transform={`rotateY(180deg) translateZ(${translateZ}px)`} label="About" size={cubeSize}>
            <div className="space-y-3">
              <IoInformationCircle className="text-4xl text-blue-400 mx-auto" />
              <h3 className="text-xl font-bold">About This Product</h3>
              <p className="text-sm text-gray-300">{product.description}</p>
              <p className="text-xs text-gray-400">Category: {product.category}</p>
            </div>
          </Face>

          {/* LEFT - Specifications */}
          <Face transform={`rotateY(-90deg) translateZ(${translateZ}px)`} label="Specs" size={cubeSize}>
            <div className="space-y-3 text-left w-full">
              <h3 className="text-xl font-bold">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span className="font-semibold">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </Face>

          {/* TOP - Price & Add to Cart */}
          <Face transform={`rotateX(90deg) translateZ(${translateZ}px)`} label="Buy" size={cubeSize}>
            <div className="space-y-4">
              <IoPricetag className="text-5xl text-yellow-400 mx-auto" />
              <div className="text-4xl font-bold text-yellow-400">
                ${product.price}
              </div>
              <p className="text-sm text-gray-400">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
              {product.stock > 0 && onAddToCart && (
                <button
                  onClick={onAddToCart}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition"
                >
                  <IoCart /> Add to Cart
                </button>
              )}
            </div>
          </Face>

          {/* BOTTOM - Thank You */}
          <Face transform={`rotateX(-90deg) translateZ(${translateZ}px)`} label="Info" size={cubeSize}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-400">Thank You! 🎉</h3>
              <p className="text-sm">Rotate the cube to explore all product details</p>
              <p className="text-xs text-gray-400">Use arrow keys or buttons</p>
            </div>
          </Face>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-20 md:mt-24 flex justify-center gap-3 md:gap-4">
        <button
          onClick={() => rotate("left")}
          className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
          aria-label="Rotate left"
        >
          ⬅️
        </button>
        <div className="flex flex-col gap-2 md:gap-3">
          <button
            onClick={() => rotate("up")}
            className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
            aria-label="Rotate up"
          >
            ⬆️
          </button>
          <button
            onClick={() => rotate("down")}
            className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
            aria-label="Rotate down"
          >
            ⬇️
          </button>
        </div>
        <button
          onClick={() => rotate("right")}
          className="glass-strong p-3 md:p-4 rounded-full hover:scale-110 transition-transform active:scale-95"
          aria-label="Rotate right"
        >
          ➡️
        </button>
      </div>
    </div>
  );
}

// Face component (same as before but accepts size prop)
function Face({ children, transform, label, size = 300 }: any) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-xl p-6"
      style={{
        transform,
        backfaceVisibility: "hidden",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {label && (
        <span className="absolute top-2 right-4 text-xs font-bold opacity-50 uppercase tracking-widest">
          {label}
        </span>
      )}
      <div className="overflow-y-auto w-full h-full flex flex-col items-center justify-center scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
