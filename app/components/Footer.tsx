"use client";

import { IoLogoGithub } from "react-icons/io5";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text">
                CubeCart
              </span>
            </h3>
            <p className="text-sm text-gray-400">
              Revolutionary 3D product showcase platform
            </p>
          </div>

          {/* Links Section */}
          <div className="text-center">
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/chathuradinuwan/cube-cart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-yellow-400 transition inline-flex items-center justify-center gap-2"
              >
                <IoLogoGithub /> View on GitHub
              </a>
              <a
                href="https://github.com/chathuradinuwan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-yellow-400 transition"
              >
                Developer Profile
              </a>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Built With</h4>
            <p className="text-xs text-gray-400">
              Next.js • TypeScript • MongoDB
            </p>
            <p className="text-xs text-gray-400">
              Framer Motion • Tailwind CSS
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-6 pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Built with TypeScript
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} <span className="text-yellow-400 font-semibold">Chathura Dinuwan</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Licensed under the{" "}
              <a
                href="https://github.com/chathuradinuwan/cube-cart/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                MIT License
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
