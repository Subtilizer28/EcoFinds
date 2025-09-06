'use client';
import { useEffect, useState } from 'react';

const productImages = [
  '/images/prod-1.jpg',
  '/images/prod-2.jpg',
  // Add more image URLs as needed
];

export default function ProductPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div
        className={`w-full max-w-lg p-8 space-y-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800
          transition-all duration-700 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        {/* Top bar with logo and icons */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold text-blue-400 font-sans">EcoFinds</span>
          <div className="flex items-center space-x-3">
            <span className="cursor-pointer text-gray-300 hover:text-pink-400" title="Profile">
              <svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /></svg>
            </span>
            <span className="relative cursor-pointer text-gray-300 hover:text-blue-400" title="Cart">
              <svg width="24" height="24" fill="none"><rect x="6" y="8" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">1</span>
            </span>
          </div>
        </div>

        {/* Product Page Badge */}
        <div className="mb-2">
          <div className="px-3 py-1 bg-gray-800 rounded text-gray-100 font-medium w-fit">Product Page</div>
        </div>

        {/* Product Image and Carousel dots */}
        <div className="flex flex-col items-center relative">
          <div className="w-64 h-64 bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
            <img
              src={productImages[0]}
              alt="Product"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            {productImages.map((_, i) => (
              <span
                key={i}
                className={`block h-2 w-2 rounded-full ${i === 0 ? 'bg-blue-400' : 'bg-gray-500'}`}
              />
            ))}
          </div>
          <div className="absolute right-0 top-8 flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-700 text-green-200 rounded font-semibold text-xs">Assured Bee</span>
            <span className="text-gray-300 text-xs">Should have more than 1 image</span>
          </div>
        </div>

        {/* Product Description */}
        <div className="relative mt-2">
          <div className="absolute left-0 top-0 -ml-10 flex items-center">
            <span className="px-2 py-1 bg-blue-700 text-blue-200 rounded font-semibold text-xs">Dev Patel</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-gray-200 min-h-[110px] font-mono">
            <div className="font-bold mb-1">Product Description</div>
            <div>
              It should contain all the required fields.
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold animate-bounce"
          aria-label="Add to cart"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
