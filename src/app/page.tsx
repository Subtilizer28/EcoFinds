/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

const productsData = [
  { id: 1, name: 'Eco Bottle', price: 10, image: '/images/bottle.jpg' },
  { id: 2, name: 'Reusable Bag', price: 5, image: '/images/bag.jpg' },
  { id: 3, name: 'Bamboo Toothbrush', price: 3, image: '/images/toothbrush.jpg' },
];

export default function Home() {
  const [products, setProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);

    const sortedProducts = [...products];
    if (value === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-6 text-black bg-white font-sans">
      {/* Search and Filters */}
      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-4 rounded-3xl p-6 border border-gray-300 shadow-sm bg-gray-100">
        <div className="flex w-full gap-3">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-black placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
          />
          <button className="rounded-xl bg-black px-6 py-2 font-semibold text-white shadow-md hover:bg-gray-900 transition">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Sort by Price */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
          >
            <option value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>

          {/* Filter by Price Range */}
          <select className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition">
            <option>Price Range</option>
            <option value="0-500">Below ₹500</option>
            <option value="500-2000">₹500 - ₹2000</option>
            <option value="2000-5000">₹2000 - ₹5000</option>
            <option value="5000+">Above ₹5000</option>
          </select>

          {/* Categories */}
          <select className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition">
            <option>Categories</option>
            <option value="car">Car</option>
            <option value="bikes">Bikes</option>
            <option value="mobiles">Mobiles</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
      </div>

      {/* Banner Image */}
      <div className="my-10 flex w-full justify-center">
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-lg">
          <img
            src="/images/banner.jpg"
            alt="EcoFinds Banner"
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 p-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-md text-center">
              Welcome to EcoFinds
            </h1>
            <p className="mt-2 text-lg text-green-200 text-center max-w-xs">
              Discover sustainable products for a better planet
            </p>
          </div>
        </div>
      </div>

      {/* All Categories Button */}
      <button className="mb-10 rounded-full bg-black px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/40">
        Browse All Categories
      </button>

      {/* Product Cards */}
      <div className="mb-16 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center rounded-3xl bg-gray-100 border border-gray-300 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-28 w-28 rounded-full border-4 border-green-200 object-cover shadow-md"
            />
            <h3 className="mb-1 text-xl font-bold text-green-700">{product.name}</h3>
            <p className="mb-4 text-lg font-semibold text-gray-700">₹{product.price}</p>
            <button className="mt-auto rounded-full bg-black px-6 py-2 text-white font-semibold shadow-md hover:bg-gray-900 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
