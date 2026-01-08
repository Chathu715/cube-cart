"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoCube, IoArrowForward, IoArrowBack, IoArrowUp, IoArrowDown, IoImages, IoPricetag, IoCheckmarkCircle, IoInformationCircle, IoConstruct, IoHeart } from "react-icons/io5";

export default function HowItWorksPage() {
  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <IoCube className="text-6xl text-yellow-400 mx-auto mb-6 animate-spin-slow" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            How CubeCart Works
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover products in 3D space with our innovative cube interface
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">The Problem With Traditional E-commerce</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Traditional online shopping experiences suffer from <span className="text-yellow-400 font-semibold">information overload</span>.
                Product pages cram everything into one long, scrollable page: images, descriptions, specifications, features, reviews, and pricing.
              </p>
              <p className="text-lg">
                This creates a frustrating experience where users:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Scroll endlessly to find specific information</li>
                <li>Lose context as they navigate up and down</li>
                <li>Feel overwhelmed by cluttered layouts</li>
                <li>Have difficulty comparing key product details</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">The CubeCart Solution</h2>
            <p className="text-lg text-gray-300 mb-8">
              We've reimagined the product page as a <span className="font-bold text-yellow-400">3D interactive cube</span> with
              six faces, each dedicated to a specific aspect of the product. This spatial organization makes information
              discovery intuitive, engaging, and memorable.
            </p>

            <div className="glass rounded-xl p-6 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
              <p className="text-center text-lg font-semibold">
                Instead of scrolling through a long page, you <span className="text-yellow-400">rotate a cube</span> to explore.
              </p>
            </div>
          </div>
        </div>

        {/* The 6 Faces */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">The 6 Faces of Every Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Face 1 - Front */}
            <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <IoImages className="text-3xl text-blue-400" />
                <h3 className="text-xl font-bold">Front Face</h3>
              </div>
              <p className="text-gray-300 mb-3">
                Main product image gallery with ratings and reviews. Browse through multiple product photos using
                intuitive dot navigation.
              </p>
              <div className="glass rounded-lg p-3 text-center">
                <p className="text-sm text-yellow-400 font-semibold">Default View</p>
              </div>
            </div>

            {/* Face 2 - Top */}
            <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <IoPricetag className="text-3xl text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold">Top Face</h3>
                  <p className="text-xs text-gray-400">Press <kbd className="px-2 py-1 glass rounded">↑</kbd></p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">
                Price, stock availability, and the Add to Cart button. Everything you need to make a purchase
                decision in one place.
              </p>
              <div className="glass rounded-lg p-3 text-center">
                <p className="text-sm text-yellow-400 font-semibold">Buy Now</p>
              </div>
            </div>

            {/* Face 3 - Right */}
            <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <IoCheckmarkCircle className="text-3xl text-green-400" />
                <div>
                  <h3 className="text-xl font-bold">Right Face</h3>
                  <p className="text-xs text-gray-400">Press <kbd className="px-2 py-1 glass rounded">→</kbd></p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">
                Key product features and highlights. Quickly understand what makes this product special
                with bullet-point clarity.
              </p>
              <div className="glass rounded-lg p-3 text-center">
                <p className="text-sm text-green-400 font-semibold">Features</p>
              </div>
            </div>

            {/* Face 4 - Back */}
            <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <IoInformationCircle className="text-3xl text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">Back Face</h3>
                  <p className="text-xs text-gray-400">Press <kbd className="px-2 py-1 glass rounded">→→</kbd></p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">
                Detailed product description and category information. Learn about the product's story,
                use cases, and specifications.
              </p>
              <div className="glass rounded-lg p-3 text-center">
                <p className="text-sm text-blue-400 font-semibold">About</p>
              </div>
            </div>

            {/* Face 5 - Left */}
            <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <IoConstruct className="text-3xl text-purple-400" />
                <div>
                  <h3 className="text-xl font-bold">Left Face</h3>
                  <p className="text-xs text-gray-400">Press <kbd className="px-2 py-1 glass rounded">←</kbd></p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">
                Technical specifications with key-value pairs. Dimensions, weight, color, brand, model,
                and all the technical details.
              </p>
              <div className="glass rounded-lg p-3 text-center">
                <p className="text-sm text-purple-400 font-semibold">Specs</p>
              </div>
            </div>

            {/* Face 6 - Bottom */}
            <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <IoHeart className="text-3xl text-pink-400" />
                <div>
                  <h3 className="text-xl font-bold">Bottom Face</h3>
                  <p className="text-xs text-gray-400">Press <kbd className="px-2 py-1 glass rounded">↓</kbd></p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">
                Thank you message and navigation tips. A friendly reminder of how to explore the cube
                and discover all product details.
              </p>
              <div className="glass rounded-lg p-3 text-center">
                <p className="text-sm text-pink-400 font-semibold">Info</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Navigate */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Navigate the Cube</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="glass rounded-full p-3 flex-shrink-0">
                  <span className="text-2xl font-bold text-yellow-400">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Use Your Keyboard</h3>
                  <p className="text-gray-300">
                    Press the <kbd className="px-3 py-1 glass rounded text-yellow-400">arrow keys</kbd> to rotate
                    the cube in any direction. It's the fastest way to explore all six faces.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass rounded-full p-3 flex-shrink-0">
                  <span className="text-2xl font-bold text-yellow-400">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Click the Navigation Cards</h3>
                  <p className="text-gray-300">
                    Below the cube, you'll find four interactive cards showing what each face contains.
                    Click any card to instantly rotate to that face.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass rounded-full p-3 flex-shrink-0">
                  <span className="text-2xl font-bold text-yellow-400">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Your Location</h3>
                  <p className="text-gray-300">
                    A live indicator shows which face you're currently viewing (e.g., "Viewing: Front - Main").
                    Never lose track of where you are in the 3D space.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass rounded-full p-3 flex-shrink-0">
                  <span className="text-2xl font-bold text-yellow-400">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Mobile-Friendly</h3>
                  <p className="text-gray-300">
                    On mobile devices, the clickable navigation cards work perfectly. The cube automatically
                    resizes for optimal viewing on any screen size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why It's Better */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why It's Better</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">🎯 Organized Information</h3>
                <p className="text-gray-300">
                  Each face has one clear purpose. No more hunting through cluttered pages.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">⚡ Faster Exploration</h3>
                <p className="text-gray-300">
                  One arrow key press beats scrolling through hundreds of pixels.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">🎨 Memorable Experience</h3>
                <p className="text-gray-300">
                  3D interaction creates a lasting impression that static pages can't match.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">📱 Perfect for All Devices</h3>
                <p className="text-gray-300">
                  Works seamlessly on desktop, tablet, and mobile with adaptive sizing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
