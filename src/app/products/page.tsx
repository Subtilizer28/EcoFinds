'use client';
import { useEffect, useState } from 'react';

const productImages = [
  '/images/prod-1.jpg',
  '/images/prod-2.jpg',
  '/images/prod-3.jpg',
];

export default function ProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-20 font-sans text-gray-900">
      <div className="max-w-6xl w-full rounded-3xl bg-white shadow-xl p-12 flex flex-col lg:flex-row gap-16">
        {/* Main Product Image */}
        <div className="lg:w-1/2 w-full border border-gray-200 rounded-3xl bg-gray-100 flex justify-center items-center h-[480px] shadow-inner">
          <img
            alt="ecommerce"
            className={`w-full h-full object-contain rounded-3xl transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            src={productImages[activeIndex]}
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-sm tracking-widest text-gray-500 mb-3 font-semibold">BRAND NAME</h2>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            The Catcher in the Rye
          </h1>

          {/* Ratings */}
          <div className="flex items-center mb-8">
            <span className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  fill={i < 4 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 text-indigo-500"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </span>
            <span className="ml-4 text-gray-500 text-lg">4 Reviews</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            A timeless classic is back in style with our premium edition of "The Catcher in the Rye". Perfect for collectors and everyday readers alike.
          </p>

          {/* Price & Button */}
          <div className="flex items-center gap-6">
            <span className="text-4xl font-bold text-gray-900">₹4,599.00</span>
            <button className="ml-auto rounded-xl bg-black px-10 py-4 text-white text-lg font-semibold shadow-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
