'use client';
import React, { useState } from 'react';

const initialCartItems = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description of product 1',
    price: 29.99,
    quantity: 2,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description of product 2',
    price: 49.99,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  return (
    <div className="min-h-screen bg-[#131824] font-sans text-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-[#23293a] rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Your Cart (UK)</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border border-[#39415c] rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                    <p className="mt-2 font-semibold">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                      }
                      className="w-16 text-center rounded border border-[#39415c] bg-[#2c3350] text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right font-semibold text-lg w-24">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-[#39415c] pt-6">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">£{total.toFixed(2)}</span>
            </div>
            <button
              className="mt-6 w-full bg-[#3166fc] hover:bg-[#254fbf] transition py-3 rounded-lg font-semibold text-white"
              onClick={() => alert('Checkout not implemented')}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
