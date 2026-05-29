"use client";

import Link from "next/link";
import { ShoppingCart, Store, LayoutDashboard, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function Navbar() {
  const count = useCartStore((s) => s.count());
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
          <Store size={24} />
          ShopClone
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
          <Link href="/admin" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <LayoutDashboard size={16} />
            Admin
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
            Cart
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600 bg-white">
          <Link href="/products" onClick={() => setOpen(false)} className="hover:text-emerald-600">Products</Link>
          <Link href="/admin" onClick={() => setOpen(false)} className="hover:text-emerald-600">Admin</Link>
          <Link href="/cart" onClick={() => setOpen(false)} className="hover:text-emerald-600">
            Cart {count > 0 && <span className="ml-1 bg-emerald-600 text-white text-xs rounded-full px-2 py-0.5">{count}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
}
