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
    purchase.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="flex min-h-screen flex-col items-center p-6 font-sans text-white"
      style={{
        background:
          "linear-gradient(90deg,rgba(18,18,22,1) 0%,rgba(18,18,22,1) 7.692%,rgba(23,22,26,1) 7.692%,rgba(23,22,26,1) 15.385%,rgba(27,26,31,1) 15.385%,rgba(27,26,31,1) 23.077%,rgba(32,31,35,1) 23.077%,rgba(32,31,35,1) 30.769%,rgba(36,35,39,1) 30.769%,rgba(36,35,39,1) 38.462%,rgba(40,39,43,1) 38.462%,rgba(40,39,43,1) 46.154%,rgba(44,43,47,1) 46.154%,rgba(44,43,47,1) 53.846%,rgba(48,47,51,1) 53.846%,rgba(48,47,51,1) 61.538%,rgba(51,50,55,1) 61.538%,rgba(51,50,55,1) 69.231%,rgba(55,54,58,1) 69.231%,rgba(55,54,58,1) 76.923%,rgba(57,56,61,1) 76.923%,rgba(57,56,61,1) 84.615%,rgba(60,59,64,1) 84.615%,rgba(60,59,64,1) 92.308%,rgba(62,61,66,1) 92.308%,rgba(62,61,66,1) 100%)",
      }}
    >
      <h2 className="mb-8 w-full text-center text-3xl font-extrabold tracking-tight">
        My Purchases
      </h2>
      <div className="mb-6 flex w-full max-w-2xl justify-center">
        <input
          type="text"
          placeholder="🔍 Search purchases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border-none bg-[#232526] px-4 py-3 text-lg text-white shadow transition outline-none focus:ring-2 focus:ring-[#4ADE80]"
        />
      </div>
      <div className="mb-8 flex w-full max-w-2xl justify-center gap-4">
        <button className="flex-1 rounded-xl bg-[#4ADE80] py-2 font-semibold text-[#18181b] shadow transition hover:bg-[#22c55e]">
          Sort
        </button>
        <button className="flex-1 rounded-xl bg-[#4ADE80] py-2 font-semibold text-[#18181b] shadow transition hover:bg-[#22c55e]">
          Filter
        </button>
        <button className="flex-1 rounded-xl bg-[#4ADE80] py-2 font-semibold text-[#18181b] shadow transition hover:bg-[#22c55e]">
          Group by
        </button>
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-6">
        {filteredPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex w-full flex-row items-center rounded-2xl border border-[#333] bg-[#232526] p-6 shadow-lg transition hover:scale-[1.01]"
          >
            <div className="mr-6 flex h-20 w-20 items-center justify-center rounded-xl border border-[#333] bg-[#18181b] shadow-inner">
              <span className="text-3xl">🛒</span>
            </div>
            <div className="flex-1">
              <div className="mb-1 text-xl font-bold">{purchase.name}</div>
              <div className="mb-1 text-lg font-semibold text-[#4ADE80]">
                {purchase.price}
              </div>
              <div className="mb-1 text-sm text-gray-300">
                <span className="font-semibold">Category:</span>{" "}
                {purchase.category}
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-semibold">Seller:</span> {purchase.seller}
              </div>
            </div>
          </div>
        ))}
        {filteredPurchases.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            No purchases found.
          </div>
        )}
      </div>
    </div>
  );
}
