"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
      : "https://fakestoreapi.com/products";
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {category ? <span className="capitalize">{category}</span> : "All Products"}
      </h1>
      <p className="text-gray-400 text-sm mb-8">{products.length} products found</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/products"
          className={`capitalize text-sm font-medium px-4 py-2 rounded-full border transition-colors ${!category ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"}`}>
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`}
            className={`capitalize text-sm font-medium px-4 py-2 rounded-full border transition-colors ${category === cat ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"}`}>
            {cat}
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 h-72 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
