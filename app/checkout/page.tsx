"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "", card: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center">
        <div className="bg-emerald-50 rounded-full p-6">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Order Placed!</h2>
        <p className="text-gray-400">Thank you for your order. You&apos;ll receive a confirmation email shortly.</p>
        <button
          onClick={() => router.push("/products")}
          className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const cartTotal = total();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-800">Contact Information</h2>
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
              { key: "email", label: "Email", type: "email", placeholder: "john@example.com" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-800">Shipping Address</h2>
            {[
              { key: "address", label: "Address", placeholder: "123 Main St" },
              { key: "city", label: "City", placeholder: "New York" },
              { key: "zip", label: "ZIP Code", placeholder: "10001" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  required
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-800">Payment</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                required
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                value={form.card}
                onChange={(e) => setForm({ ...form, card: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <p className="text-xs text-gray-400">This is a demo — no real payment is processed.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Place Order — ${(cartTotal + (cartTotal >= 50 ? 0 : 5.99)).toFixed(2)}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit space-y-4">
          <h2 className="font-bold text-gray-800">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span className="line-clamp-1 flex-1 mr-4">{item.title} × {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{cartTotal >= 50 ? "Free" : "$5.99"}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>${(cartTotal + (cartTotal >= 50 ? 0 : 5.99)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
