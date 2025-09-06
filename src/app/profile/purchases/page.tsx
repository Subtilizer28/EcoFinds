"use client";
import React, { useState } from "react";
import type { Purchase } from "../../../types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const mockPurchases: Purchase[] = [
  {
    id: 1,
    name: "Eco Water Bottle",
    price: "$12.99",
    category: "Home",
    seller: "GreenStore",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Reusable Bag",
    price: "$5.49",
    category: "Accessories",
    seller: "EcoMart",
    imageUrl: "",
  },
  {
    id: 3,
    name: "Bamboo Toothbrush",
    price: "$3.99",
    category: "Personal Care",
    seller: "NatureShop",
    imageUrl: "",
  },
];

export default function MyPurchasesPage() {
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      void router.push("/auth/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const filteredPurchases = mockPurchases.filter((purchase) =>
    purchase.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-6 font-sans">
      <h2 className="mb-8 w-full text-center text-3xl font-extrabold tracking-tight max-w-2xl bg-white rounded-xl py-4 shadow">
        My Purchases
      </h2>
      <div className="mb-6 w-full max-w-2xl flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search purchases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-gray-200 px-4 py-3 text-lg text-gray-900 shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
        />
      </div>
      <div className="mb-8 w-full max-w-2xl flex justify-center gap-4">
        <button className="flex-1 rounded-xl bg-black py-2 font-semibold text-white shadow transition hover:bg-gray-800">
          Sort
        </button>
        <button className="flex-1 rounded-xl bg-black py-2 font-semibold text-white shadow transition hover:bg-gray-800">
          Filter
        </button>
        <button className="flex-1 rounded-xl bg-black py-2 font-semibold text-white shadow transition hover:bg-gray-800">
          Group by
        </button>
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-6">
        {filteredPurchases.length > 0 ? (
          filteredPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex w-full flex-row items-center rounded-2xl border border-gray-300 bg-white p-6 shadow-sm transition hover:scale-[1.01]"
            >
              <div className="mr-6 flex h-20 w-20 items-center justify-center rounded-xl border border-gray-300 bg-gray-200 shadow-inner">
                <span className="text-3xl">🛒</span>
              </div>
              <div className="flex-1">
                <div className="mb-1 text-xl font-bold text-gray-900">{purchase.name}</div>
                <div className="mb-1 text-lg font-semibold text-green-600">
                  {purchase.price}
                </div>
                <div className="mb-1 text-sm text-gray-700">
                  <span className="font-semibold">Category:</span> {purchase.category}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Seller:</span> {purchase.seller}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">No purchases found.</div>
        )}
      </div>
    </div>
  );
}
