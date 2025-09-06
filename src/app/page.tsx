/* eslint-disable @next/next/no-img-element */
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  const products = [
    { id: 1, name: "Eco Bottle", price: "$10", image: "/images/bottle.jpg" },
    { id: 2, name: "Reusable Bag", price: "$5", image: "/images/bag.jpg" },
    {
      id: 3,
      name: "Bamboo Toothbrush",
      price: "$3",
      image: "/images/toothbrush.jpg",
    },
  ];

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center px-4 text-gray-900">
        {/* Search and Filters */}
        <div className="mt-10 flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl p-6">
          <input
            type="text"
            placeholder="Search eco-friendly products..."
            className="flex-1 w-96 rounded-xl border border-green-400 bg-white px-4 py-2 text-gray-800 focus:border-green-600 focus:outline-none"
          />
          <div className="flex gap-3">
            <select className="rounded-xl border border-green-400 bg-white px-2 py-2 text-gray-800 focus:border-green-600 focus:outline-none">
              <option>Sort by</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
            <select className="rounded-xl border border-green-400 bg-white px-2 py-2 text-gray-800 focus:border-green-600 focus:outline-none">
              <option>Filter</option>
              <option value="eco">Eco Friendly</option>
              <option value="popular">Popular</option>
            </select>
            <select className="rounded-xl border border-green-400 bg-white px-2 py-2 text-gray-800 focus:border-green-600 focus:outline-none">
              <option>Group by</option>
              <option value="category">Category</option>
              <option value="brand">Brand</option>
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
              <p className="mb-4 text-lg font-semibold text-gray-700">{product.price}</p>
              <button className="mt-auto rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}
