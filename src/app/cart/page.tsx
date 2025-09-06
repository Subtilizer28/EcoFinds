/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Cart item type
type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

// ✅ Helper: get cart from cookies
const getCartFromCookies = (): CartItem[] => {
  try {
    const raw = document.cookie.replace(
      /(?:(?:^|.*;\s*)cart\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

// ✅ Helper: save cart to cookies
const saveCartToCookies = (cart: CartItem[]) => {
  document.cookie = `cart=${JSON.stringify(
    cart
  )}; path=/; max-age=2592000`; // 30 days
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  // Load cart from cookies
  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
      return;
    }
    const storedCart = getCartFromCookies();
    setCartItems(storedCart);
  }, [session, router]);

  if (!session) return null;

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    saveCartToCookies(updated);
  };

  // Remove item
  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    saveCartToCookies(updated);
  };

  // GBP → INR conversion
  const convertToINR = (gbp: number) => gbp * 101;

  const total = cartItems.reduce(
    (acc, item) => acc + convertToINR(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans px-6 py-10 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl p-8 shadow-md transition">
        <h1 className="text-4xl font-semibold mb-8 tracking-tight text-gray-900">
          Your Bag
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your bag is empty.</p>
        ) : (
          <>
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-6 pb-6 border-b-2 border-gray-300 ${
                    index === cartItems.length - 1 ? "mb-0 border-b-0" : "mb-6"
                  } rounded-lg`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-gray-600 text-sm">
                      {item.description}
                    </p>
                    <p className="mt-2 font-semibold text-lg text-gray-900">
                      ₹{convertToINR(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                      }
                      className="w-16 text-center rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center text-lg font-medium border-t border-gray-300 pt-6 rounded-md shadow-inner">
              <span className="text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-gray-900">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <button
              className="mt-8 w-full bg-black hover:bg-gray-800 transition-all py-5 rounded-2xl font-semibold text-white text-lg shadow-md"
              onClick={() => alert("Checkout not implemented")}
            >
              Check Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
