import { Order } from "@/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    items: [],
    total: 129.99,
    status: "delivered",
    date: "2026-05-25",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    email: "bob@example.com",
    items: [],
    total: 74.5,
    status: "shipped",
    date: "2026-05-26",
  },
  {
    id: "ORD-003",
    customer: "Carol White",
    email: "carol@example.com",
    items: [],
    total: 39.99,
    status: "processing",
    date: "2026-05-27",
  },
  {
    id: "ORD-004",
    customer: "David Brown",
    email: "david@example.com",
    items: [],
    total: 210.0,
    status: "pending",
    date: "2026-05-28",
  },
  {
    id: "ORD-005",
    customer: "Eva Green",
    email: "eva@example.com",
    items: [],
    total: 55.75,
    status: "processing",
    date: "2026-05-29",
  },
];

const STATUS_STYLES: Record<Order["status"], string> = {
  pending: "bg-yellow-50 text-yellow-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-purple-50 text-purple-700",
  delivered: "bg-emerald-50 text-emerald-700",
};

export default function AdminOrdersPage() {
  const revenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-400 text-sm">{MOCK_ORDERS.length} orders · ${revenue.toFixed(2)} revenue</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Total</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{order.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{order.customer}</p>
                      <p className="text-gray-400 text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{order.date}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`capitalize text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
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
