import { getProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm">{products.length} total products</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Price</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Rating</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0">
                        <Image src={product.image} alt={product.title} fill className="object-contain p-1" sizes="40px" />
                      </div>
                      <span className="font-medium text-gray-800 line-clamp-1 max-w-xs">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={12} className="fill-yellow-400" />
                      <span className="text-gray-600">{product.rating.rate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                      target="_blank"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
