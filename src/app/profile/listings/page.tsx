/* eslint-disable @next/next/no-img-element */
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Listing = {
  id: number;
  name: string;
  price: number;
  category: string;
  status: string;
  seller: string;
  image: string;
};

const initialListings: Listing[] = [
  {
    id: 1,
    name: 'Vintage Clock',
    price: 120,
    category: 'Antiques',
    status: 'Available',
    seller: 'John Doe',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 2,
    name: 'Modern Lamp',
    price: 60,
    category: 'Home Decor',
    status: 'Sold',
    seller: 'Jane Doe',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 3,
    name: 'Rare Book',
    price: 45,
    category: 'Books',
    status: 'Available',
    seller: 'Bob Smith',
    image: 'https://via.placeholder.com/80',
  },
];

export default function MyListings() {
  const [search, setSearch] = useState('');
  const [listings] = useState(initialListings);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    void router.push("/auth/login");
    return null;
  }
  // Search filtering
  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 font-sans flex flex-col items-center">
      <h2 className="text-center mb-8 text-3xl font-extrabold tracking-tight w-full max-w-3xl bg-white rounded-xl py-4 shadow">
        My Listings
      </h2>
      <div className="flex justify-center mb-6 w-full max-w-3xl">
        <input
          type="text"
          placeholder="🔍 Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-200 text-gray-900 text-lg shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
        />
      </div>
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
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow border border-gray-300 hover:scale-[1.01] transition p-6 flex flex-row items-center w-full"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl bg-gray-300 flex items-center justify-center mr-6 shadow-inner border border-gray-300 object-cover"
              />
              <div className="flex-1">
                <div className="font-bold text-xl mb-1 text-gray-900">{item.name}</div>
                <div className="text-green-600 font-semibold text-lg mb-1">
                  £{item.price}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Category:</span> {item.category}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="font-semibold">Status:</span> {item.status}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Seller:</span> {item.seller}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">No listings found.</div>
        )}
      </div>
    </div>
  );
}
