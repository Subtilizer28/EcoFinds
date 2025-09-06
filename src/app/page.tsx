/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

const productsData = [
  { id: 1, name: "Eco Bottle", price: 10, image: "/images/bottle.jpg" },
  { id: 2, name: "Reusable Bag", price: 5, image: "/images/bag.jpg" },
  { id: 3, name: "Bamboo Toothbrush", price: 3, image: "/images/toothbrush.jpg" },
];

export default function Home() {
  const [products, setProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);

    const sortedProducts = [...products];
    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 text-gray-900">
      {/* Search and Filters */}
      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-4 rounded-xl p-6">
        <div className="flex w-full gap-3">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 rounded-xl border border-green-400 bg-white px-4 py-2 text-gray-800 focus:border-green-600 focus:outline-none"
          />
          <button className="rounded-xl bg-green-600 px-6 py-2 font-semibold text-white shadow hover:bg-green-700 transition">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Sort by Price */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="rounded-xl border border-green-400 bg-white px-3 py-2 text-gray-800 focus:border-green-600 focus:outline-none"
          >
            <option value="">Sort by Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>

          {/* Filter by Price Range */}
          <select className="rounded-xl border border-green-400 bg-white px-3 py-2 text-gray-800 focus:border-green-600 focus:outline-none">
            <option>Price Range</option>
            <option value="0-500">Below ₹500</option>
            <option value="500-2000">₹500 - ₹2000</option>
            <option value="2000-5000">₹2000 - ₹5000</option>
            <option value="5000+">Above ₹5000</option>
          </select>

          {/* Categories */}
          <select className="rounded-xl border border-green-400 bg-white px-3 py-2 text-gray-800 focus:border-green-600 focus:outline-none">
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
        <div className="relative w-full max-w-2xl">
          <img
            src="/images/banner.jpg"
            alt="EcoFinds Banner"
            className="h-64 w-full rounded-2xl object-cover shadow-2xl"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 rounded-2xl">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
              Welcome to EcoFinds
            </h1>
            <p className="mt-2 text-lg text-green-100">
              Discover sustainable products for a better planet
            </p>
          </div>
        </div>
      </div>

      {/* All Categories Button */}
      <button className="mb-10 rounded-full bg-gradient-to-r from-green-500 to-green-700 px-10 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300">
        Browse All Categories
      </button>

      {/* Product Cards */}
      <div className="mb-16 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-32 w-32 rounded-full border-4 border-green-200 object-cover shadow"
            />
            <h3 className="mb-1 text-xl font-bold text-green-700">{product.name}</h3>
            <p className="mb-4 text-lg font-semibold text-gray-700">₹{product.price}</p>
            <button className="mt-auto rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
