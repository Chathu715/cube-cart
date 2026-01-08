import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CubeCart - 3D E-Commerce Experience",
  description: "Experience products in a whole new dimension with CubeCart's revolutionary 3D cube interface. Browse, explore, and shop with an innovative spatial product showcase.",
  keywords: ["e-commerce", "3D shopping", "interactive products", "cube cart", "online shopping"],
  authors: [{ name: "Chathura Dinuwan", url: "https://github.com/chathuradinuwan" }],
  creator: "Chathura Dinuwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "CubeCart - 3D E-Commerce Experience",
    description: "Revolutionary 3D product showcase platform",
    siteName: "CubeCart",
  },
  twitter: {
    card: "summary_large_image",
    title: "CubeCart - 3D E-Commerce Experience",
    description: "Revolutionary 3D product showcase platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
