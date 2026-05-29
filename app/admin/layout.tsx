import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, BarChart2 } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white flex flex-col py-8 px-4 gap-1 flex-shrink-0">
        <div className="flex items-center gap-2 px-3 mb-6">
          <BarChart2 size={20} className="text-emerald-400" />
          <span className="font-bold text-sm">Admin Panel</span>
        </div>
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </aside>
      <div className="flex-1 bg-gray-50 overflow-auto">{children}</div>
    </div>
  );
}
