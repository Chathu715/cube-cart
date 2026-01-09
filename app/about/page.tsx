"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { IoCube, IoRocket, IoHeart, IoTrophy } from "react-icons/io5";

export default function AboutPage() {
  return (
    <div className="animated-gradient min-h-screen flex flex-col">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            About CubeCart
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing e-commerce with 3D spatial interfaces
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <IoCube className="text-5xl text-yellow-400" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              CubeCart is on a mission to transform the online shopping experience by making it more
              engaging, intuitive, and memorable. We believe that product discovery shouldn't be limited
              to endless scrolling and static images.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              By leveraging CSS 3D transformations and modern web technologies, we've created a spatial
              interface that organizes product information across six interactive faces, making it easier
              for customers to explore and understand products before making a purchase.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <IoRocket className="text-5xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-gray-300">
                We constantly push the boundaries of web technology to create unique user experiences
                that stand out in the crowded e-commerce space.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <IoHeart className="text-5xl text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">User-Centric Design</h3>
              <p className="text-gray-300">
                Every feature we build is designed with the end user in mind. Beautiful interfaces
                mean nothing if they don't solve real problems.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <IoTrophy className="text-5xl text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Excellence</h3>
              <p className="text-gray-300">
                We're committed to delivering production-grade code with TypeScript, comprehensive
                error handling, and smooth performance across all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Built With Cutting-Edge Technology</h2>
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="glass rounded-lg p-4 mb-2">
                  <p className="text-lg font-bold text-yellow-400">Next.js 16</p>
                </div>
                <p className="text-sm text-gray-400">React Framework</p>
              </div>

              <div className="text-center">
                <div className="glass rounded-lg p-4 mb-2">
                  <p className="text-lg font-bold text-blue-400">TypeScript</p>
                </div>
                <p className="text-sm text-gray-400">Type Safety</p>
              </div>

              <div className="text-center">
                <div className="glass rounded-lg p-4 mb-2">
                  <p className="text-lg font-bold text-green-400">MongoDB</p>
                </div>
                <p className="text-sm text-gray-400">Database</p>
              </div>

              <div className="text-center">
                <div className="glass rounded-lg p-4 mb-2">
                  <p className="text-lg font-bold text-pink-400">Framer Motion</p>
                </div>
                <p className="text-sm text-gray-400">Animations</p>
              </div>

              <div className="text-center">
                <div className="glass rounded-lg p-4 mb-2">
                  <p className="text-lg font-bold text-cyan-400">Tailwind CSS</p>
                </div>
                <p className="text-sm text-gray-400">Styling</p>
              </div>

              <div className="text-center">
                <div className="glass rounded-lg p-4 mb-2">
                  <p className="text-lg font-bold text-purple-400">CSS 3D</p>
                </div>
                <p className="text-sm text-gray-400">Transforms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Meet The Developer</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl font-semibold text-yellow-400 mb-4">Chathura Dinuwan</p>
              <p className="text-gray-300 mb-6">
                Full-stack developer passionate about creating innovative web experiences.
                CubeCart represents the intersection of creative design and technical excellence,
                showcasing what's possible when you push the limits of modern web development.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://chathura-dinuwan.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                  View Portfolio
                </a>
                <a
                  href="https://github.com/Chathu715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass rounded-full font-semibold hover:bg-white/10 transition"
                >
                  GitHub Profile
                </a>
                <a
                  href="https://www.linkedin.com/in/chathura-dinuwan-1b5652256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass rounded-full font-semibold hover:bg-white/10 transition"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Chathu715/cube-cart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass rounded-full font-semibold hover:bg-white/10 transition"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
