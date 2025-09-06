'use client';
import React, { useState } from 'react';

const initialCartItems = [
  {
    id: 1,
    name: "iPhone 15 Pro Case",
    description: "Premium leather case",
    price: 59.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "AirPods Pro",
    description: "Wireless noise-cancelling earbuds",
    price: 249.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-black px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#1d1d1f] text-white rounded-3xl p-8 shadow-2xl transition">
        <h1 className="text-4xl font-semibold mb-8 tracking-tight">Your Bag</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your bag is empty.</p>
        ) : (
          <>
            <div className="bg-gray-700 rounded-xl p-8 shadow-lg">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-6 pb-6 border-b-2 border-gray-500 ${
                    index === cartItems.length - 1 ? 'mb-0 border-b-0' : 'mb-6'
                  } shadow-md rounded-lg`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="mt-1 text-gray-300 text-sm">{item.description}</p>
                    <p className="mt-2 font-semibold text-lg">£{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                      }
                      className="w-16 text-center rounded-lg border border-gray-600 bg-[#2c2c2e] text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center text-lg font-medium border-t border-gray-600 pt-6 shadow-inner rounded-md">
              <span>Total:</span>
              <span className="text-3xl font-bold">£{total.toFixed(2)}</span>
            </div>

            <button
              className="mt-8 w-full bg-black hover:bg-[#333] transition-all py-5 rounded-2xl font-semibold text-white text-lg shadow-lg"
              onClick={() => alert('Checkout not implemented')}
            >
              Check Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
