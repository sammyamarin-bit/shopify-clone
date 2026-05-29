import Link from "next/link";
import { ArrowRight, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <span className="inline-block bg-emerald-500/30 text-emerald-100 text-sm font-medium px-3 py-1 rounded-full">
              New arrivals every week
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Shop Everything<br />You Love
            </h1>
            <p className="text-emerald-100 text-lg max-w-md">
              Discover thousands of products across all categories. Quality items, great prices, fast delivery.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/products"
                className="flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6" />
              <div className="absolute inset-0 bg-white/10 rounded-3xl -rotate-3" />
              <div className="relative bg-white/20 rounded-3xl h-full flex items-center justify-center">
                <ShoppingBag size={80} className="text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
            { icon: Shield, label: "Secure Payment", desc: "100% protected" },
            { icon: RotateCcw, label: "Easy Returns", desc: "30-day policy" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 rounded-xl p-3">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="capitalize bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full hover:border-emerald-400 hover:text-emerald-600 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
