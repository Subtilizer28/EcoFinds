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
    <section className="body-font text-gray-300">
      <div className="max-w-5xl mx-auto mt-20 bg-gray-800 rounded-3xl shadow-xl border border-gray-700 p-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Main Product Image */}
          <div className="lg:w-1/2 w-full border border-gray-600 rounded-lg bg-gray-900 flex justify-center items-center h-96">
            <img
              alt="ecommerce"
              className={`w-full h-full object-cover rounded transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              src={productImages[activeIndex]}
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
              BRAND NAME
            </h2>
            <h1 className="text-white text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
              The Catcher in the Rye
            </h1>

            {/* Ratings */}
            <div className="flex items-center mb-6">
              <span className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
              <span className="text-gray-400 ml-3 text-lg">4 Reviews</span>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-gray-400 text-lg mb-8">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY.
            </p>

            {/* Price & Button */}
            <div className="flex items-center gap-6">
              <span className="title-font font-medium text-3xl text-white">
                $58.00
              </span>
              <button className="ml-auto text-white bg-indigo-600 border-0 py-3 px-8 text-lg focus:outline-none hover:bg-indigo-700 rounded-lg">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
