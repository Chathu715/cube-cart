"use client";

import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import { IoClose, IoTrash, IoAdd, IoRemove, IoCart, IoCheckmarkCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-gray-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <IoCart className="text-2xl text-yellow-400" />
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition"
                aria-label="Close cart"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <IoCart className="text-6xl text-gray-600 mx-auto mb-4" />
                  <p className="text-xl text-gray-400 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500">Add some products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="glass rounded-xl p-4 flex gap-4"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-yellow-400 font-bold mb-2">${item.price.toFixed(2)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-1 glass rounded hover:bg-white/10 transition"
                            aria-label="Decrease quantity"
                          >
                            <IoRemove />
                          </button>

                          <span className="px-3 py-1 glass rounded font-semibold min-w-[40px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="p-1 glass rounded hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <IoAdd />
                          </button>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="ml-auto p-2 text-red-400 hover:bg-red-400/10 rounded transition"
                            aria-label="Remove item"
                          >
                            <IoTrash />
                          </button>
                        </div>

                        {item.quantity >= item.stock && (
                          <p className="text-xs text-orange-400 mt-1">Max stock reached</p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart Button */}
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-bold text-2xl text-yellow-400">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    // TODO: Implement checkout
                    alert("Checkout functionality coming soon!");
                  }}
                  className="w-full py-4 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition flex items-center justify-center gap-2"
                >
                  <IoCheckmarkCircle className="text-xl" />
                  Proceed to Checkout
                </button>

                <p className="text-xs text-center text-gray-500">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
