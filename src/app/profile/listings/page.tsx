/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // <- adjust path if needed
import type { Product } from "@prisma/client";

export default function MyListings() {
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  // ✅ Call your getListing procedure
  const { data: listings = [], isLoading } = api.product.getListing.useQuery();

  // Apply search filtering
  const filteredListings = listings.filter((listing: Product) => {
    if (!listing.title || typeof listing.title !== "string") return false;
    return (
      typeof search === "string" &&
      listing.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 font-sans flex flex-col items-center">
      <h2 className="text-center mb-8 text-3xl font-extrabold tracking-tight w-full max-w-3xl bg-white rounded-xl py-4 shadow">
        My Listings
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-6 w-full max-w-3xl">
        <input
          type="text"
          placeholder="🔍 Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-200 text-gray-900 text-lg shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
        />
      </div>

      {/* Sorting / Filtering buttons (not wired yet) */}
      <div className="flex gap-4 justify-center mb-8 w-full max-w-3xl">
        <button className="flex-1 py-2 rounded-xl bg-black text-white font-semibold shadow transition hover:bg-gray-800">
          Sort
        </button>
        <button className="flex-1 py-2 rounded-xl bg-black text-white font-semibold shadow transition hover:bg-gray-800">
          Filter
        </button>
        <button className="flex-1 py-2 rounded-xl bg-black text-white font-semibold shadow transition hover:bg-gray-800">
          Group by
        </button>
      </div>

      {/* Listings */}
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {isLoading ? (
          <div className="text-center text-gray-500 py-12">Loading...</div>
        ) : filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow border border-gray-300 hover:scale-[1.01] transition p-6 flex flex-row items-center w-full"
            >
              <img
                src={"https://via.placeholder.com/80"}
                alt={item.title}
                className="w-20 h-20 rounded-xl bg-gray-300 flex items-center justify-center mr-6 shadow-inner border border-gray-300 object-cover"
              />
              <div className="flex-1">
                <div className="font-bold text-xl mb-1 text-gray-900">
                  {item.title}
                </div>
                <div className="text-green-600 font-semibold text-lg mb-1">
                  £{item.price}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="font-semibold">Condition:</span>{" "}
                  {item.condition}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Year:</span>{" "}
                  {item.yearOfManufacture}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            No listings found.
          </div>
        )}
      </div>
    </div>
  );
}
