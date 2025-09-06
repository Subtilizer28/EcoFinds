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
      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-5 rounded-3xl p-8 border border-gray-300 bg-gray-50 shadow-sm">
        <div className="flex w-full gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 focus:outline-none transition shadow-sm"
          />
          <button className="rounded-xl bg-black px-7 py-3 font-semibold text-white shadow-md hover:bg-gray-900 transition-transform duration-150 active:scale-95">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Sort by Price */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-black placeholder-gray-500 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 focus:outline-none transition shadow-sm"
          >
            <option value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>

          {/* Filter by Price Range */}
          <select
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-black placeholder-gray-500 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 focus:outline-none transition shadow-sm"
          >
            <option>Price Range</option>
            <option value="0-500">Below ₹500</option>
            <option value="500-2000">₹500 - ₹2000</option>
            <option value="2000-5000">₹2000 - ₹5000</option>
            <option value="5000+">Above ₹5000</option>
          </select>

          {/* Categories */}
          <select
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-black placeholder-gray-500 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 focus:outline-none transition shadow-sm"
          >
            <option>Categories</option>
            <option value="car">Car</option>
            <option value="bikes">Bikes</option>
            <option value="mobiles">Mobiles</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
      </div>

      {/* Banner Image */}
      <div className="my-12 flex w-full justify-center">
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/images/banner.jpg"
            alt="EcoFinds Banner"
            className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 p-6 backdrop-blur-sm">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg text-center leading-tight">
              Welcome to EcoFinds
            </h1>
            <p className="mt-3 text-lg text-gray-300 text-center max-w-xs">
              Discover sustainable products for a better planet
            </p>
          </div>
        </div>
      </div>

      {/* All Categories Button */}
      <button className="mb-12 rounded-full bg-black px-12 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-black/40">
        Browse All Categories
      </button>

      {/* Product Cards */}
      <div className="mb-16 grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center rounded-3xl bg-white border border-gray-300 p-6 shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-5 h-32 w-32 rounded-full border-4 border-gray-200 object-cover shadow-md transition-transform duration-300 hover:scale-105"
            />
            <h3 className="mb-2 text-xl font-bold text-gray-900">{product.name}</h3>
            <p className="mb-6 text-xl font-semibold text-gray-700">₹{product.price}</p>
            <button className="mt-auto rounded-full bg-black px-6 py-3 text-white font-semibold shadow-lg hover:bg-gray-900 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-4 focus:ring-black/40">
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
