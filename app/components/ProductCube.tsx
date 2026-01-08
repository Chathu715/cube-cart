"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoStar, IoCart, IoInformationCircle, IoPricetag, IoCheckmarkCircle, IoArrowBack, IoArrowForward, IoArrowUp, IoArrowDown } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";

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
}

export default function ProductCube({ product }: ProductCubeProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      stock: product.stock,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Auto-hide hint after first interaction
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
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
    setShowHint(false); // Hide hint on first interaction
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

  // Get current face based on rotation
  const getCurrentFace = () => {
    const normalizedY = ((rotation.y % 360) + 360) % 360;
    const normalizedX = ((rotation.x % 360) + 360) % 360;

    if (normalizedX >= 45 && normalizedX < 135) return "Top - Price & Cart";
    if (normalizedX >= 225 && normalizedX < 315) return "Bottom - Info";
    if (normalizedY >= 45 && normalizedY < 135) return "Left - Specs";
    if (normalizedY >= 135 && normalizedY < 225) return "Back - About";
    if (normalizedY >= 225 && normalizedY < 315) return "Right - Features";
    return "Front - Main";
  };

  const cubeSize = isMobile ? 280 : 350;
  const translateZ = cubeSize / 2;

  return (
    <div className="relative">
      {/* Interactive Hint */}
      {showHint && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 md:-translate-y-24 z-10 animate-bounce">
          <div className="glass-strong px-6 py-3 rounded-full text-sm font-medium text-yellow-400 shadow-lg border border-yellow-400/30">
            ⌨️ Use arrow keys to explore 6 faces
          </div>
        </div>
      )}

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
          {/* FRONT - Product Image & Name with Gallery */}
          <Face transform={`rotateY(0deg) translateZ(${translateZ}px)`} label="Main" size={cubeSize}>
            <div className="space-y-4">
              {product.images[currentImageIndex] && (
                <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Image Gallery Dots - Only show if multiple images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-yellow-400 w-6'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
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
              {product.stock > 0 && (
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition ${
                    addedToCart
                      ? "bg-green-400 text-black"
                      : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <IoCheckmarkCircle /> Added!
                    </>
                  ) : (
                    <>
                      <IoCart /> {isInCart(product._id) ? "Add More" : "Add to Cart"}
                    </>
                  )}
                </button>
              )}
            </div>
          </Face>

          {/* BOTTOM - Thank You */}
          <Face transform={`rotateX(-90deg) translateZ(${translateZ}px)`} label="Info" size={cubeSize}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-400">Thank You!</h3>
              <p className="text-sm">Rotate the cube to explore all product details</p>
              <p className="text-xs text-gray-400">Use arrow keys or buttons</p>
            </div>
          </Face>
        </motion.div>
      </div>

      {/* Current Face Indicator */}
      <div className="mt-8 text-center">
        <div className="inline-block glass-strong px-6 py-2 rounded-full border border-yellow-400/30">
          <span className="text-sm font-medium text-yellow-400">
            Viewing: {getCurrentFace()}
          </span>
        </div>
      </div>

      {/* Keyboard Guide - Now Clickable */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <button
          onClick={() => rotate("left")}
          className="glass p-3 rounded-lg text-center hover:bg-yellow-400/10 transition-all hover:scale-105 active:scale-95"
        >
          <kbd className="inline-block px-3 py-2 bg-yellow-400/10 rounded border border-yellow-400/30 text-yellow-400 font-bold mb-2">←</kbd>
          <p className="text-xs text-gray-400">Left Face</p>
          <p className="text-xs text-yellow-400 font-medium">Specs</p>
        </button>
        <button
          onClick={() => rotate("right")}
          className="glass p-3 rounded-lg text-center hover:bg-yellow-400/10 transition-all hover:scale-105 active:scale-95"
        >
          <kbd className="inline-block px-3 py-2 bg-yellow-400/10 rounded border border-yellow-400/30 text-yellow-400 font-bold mb-2">→</kbd>
          <p className="text-xs text-gray-400">Right Face</p>
          <p className="text-xs text-yellow-400 font-medium">Features</p>
        </button>
        <button
          onClick={() => rotate("up")}
          className="glass p-3 rounded-lg text-center hover:bg-yellow-400/10 transition-all hover:scale-105 active:scale-95"
        >
          <kbd className="inline-block px-3 py-2 bg-yellow-400/10 rounded border border-yellow-400/30 text-yellow-400 font-bold mb-2">↑</kbd>
          <p className="text-xs text-gray-400">Top Face</p>
          <p className="text-xs text-yellow-400 font-medium">Buy</p>
        </button>
        <button
          onClick={() => rotate("down")}
          className="glass p-3 rounded-lg text-center hover:bg-yellow-400/10 transition-all hover:scale-105 active:scale-95"
        >
          <kbd className="inline-block px-3 py-2 bg-yellow-400/10 rounded border border-yellow-400/30 text-yellow-400 font-bold mb-2">↓</kbd>
          <p className="text-xs text-gray-400">Bottom Face</p>
          <p className="text-xs text-yellow-400 font-medium">Info</p>
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Click the cards above or press arrow keys to explore all 6 faces
        </p>
      </div>
    </div>
  );
}

// Face component
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
