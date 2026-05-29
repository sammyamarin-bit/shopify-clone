import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopClone — Modern E-commerce",
  description: "A Shopify-inspired e-commerce store built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-white mt-16 py-8 text-center text-sm text-gray-400">
          © 2026 ShopClone — Built with Next.js &amp; FakeStoreAPI
        </footer>
      </body>
    </html>
  );
}
