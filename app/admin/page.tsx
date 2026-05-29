export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/api";
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = await getProducts();
  const totalValue = products.reduce((s, p) => s + p.price, 0);
  const categories = [...new Set(products.map((p) => p.category))];

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Catalog Value", value: `$${totalValue.toFixed(0)}`, icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
    { label: "Categories", value: categories.length, icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
    { label: "Mock Orders", value: 24, icon: ShoppingCart, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back, Admin</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`rounded-xl p-3 ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Recent Products</h2>
            <Link href="/admin/products" className="text-xs text-emerald-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 line-clamp-1 flex-1 mr-4">{p.title}</span>
                <span className="font-semibold text-gray-900 flex-shrink-0">${p.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Categories</h2>
          <div className="space-y-3">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              const pct = Math.round((count / products.length) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-600">{cat}</span>
                    <span className="text-gray-400">{count} products</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
