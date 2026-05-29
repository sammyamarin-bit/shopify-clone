export const dynamic = "force-dynamic";

import { getProducts, getCategories, getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [allProducts, categories] = await Promise.all([
    category ? getProductsByCategory(category) : getProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {category ? <span className="capitalize">{category}</span> : "All Products"}
      </h1>
      <p className="text-gray-400 text-sm mb-8">{allProducts.length} products found</p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/products"
          className={`capitalize text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
            !category
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className={`capitalize text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              category === cat
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
