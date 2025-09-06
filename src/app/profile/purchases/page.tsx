"use client";
import React, { useState } from "react";

type Purchase = {
    id: number;
    name: string;
    price: string;
    category: string;
    seller: string;
    imageUrl?: string;
};

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

    const filteredPurchases = mockPurchases.filter((purchase) =>
        purchase.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="min-h-screen text-white p-6 font-sans flex flex-col items-center"
            style={{
                background:
                    "linear-gradient(90deg,rgba(18,18,22,1) 0%,rgba(18,18,22,1) 7.692%,rgba(23,22,26,1) 7.692%,rgba(23,22,26,1) 15.385%,rgba(27,26,31,1) 15.385%,rgba(27,26,31,1) 23.077%,rgba(32,31,35,1) 23.077%,rgba(32,31,35,1) 30.769%,rgba(36,35,39,1) 30.769%,rgba(36,35,39,1) 38.462%,rgba(40,39,43,1) 38.462%,rgba(40,39,43,1) 46.154%,rgba(44,43,47,1) 46.154%,rgba(44,43,47,1) 53.846%,rgba(48,47,51,1) 53.846%,rgba(48,47,51,1) 61.538%,rgba(51,50,55,1) 61.538%,rgba(51,50,55,1) 69.231%,rgba(55,54,58,1) 69.231%,rgba(55,54,58,1) 76.923%,rgba(57,56,61,1) 76.923%,rgba(57,56,61,1) 84.615%,rgba(60,59,64,1) 84.615%,rgba(60,59,64,1) 92.308%,rgba(62,61,66,1) 92.308%,rgba(62,61,66,1) 100%)",
            }}
        >
            <h2 className="text-center mb-8 text-3xl font-extrabold tracking-tight w-full">My Purchases</h2>
            <div className="flex justify-center mb-6 w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="🔍 Search purchases..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-none bg-[#232526] text-white text-lg shadow focus:ring-2 focus:ring-[#4ADE80] outline-none transition"
                />
            </div>
            <div className="flex gap-4 justify-center mb-8 w-full max-w-2xl">
                <button className="flex-1 py-2 rounded-xl bg-[#4ADE80] hover:bg-[#22c55e] text-[#18181b] font-semibold shadow transition">Sort</button>
                <button className="flex-1 py-2 rounded-xl bg-[#4ADE80] hover:bg-[#22c55e] text-[#18181b] font-semibold shadow transition">Filter</button>
                <button className="flex-1 py-2 rounded-xl bg-[#4ADE80] hover:bg-[#22c55e] text-[#18181b] font-semibold shadow transition">Group by</button>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-2xl">
                {filteredPurchases.map((purchase) => (
                    <div
                        key={purchase.id}
                        className="bg-[#232526] rounded-2xl shadow-lg border border-[#333] hover:scale-[1.01] transition p-6 flex flex-row items-center w-full"
                    >
                        <div className="w-20 h-20 rounded-xl bg-[#18181b] flex items-center justify-center mr-6 shadow-inner border border-[#333]">
                            <span className="text-3xl">🛒</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-xl mb-1">{purchase.name}</div>
                            <div className="text-[#4ADE80] font-semibold text-lg mb-1">{purchase.price}</div>
                            <div className="text-sm text-gray-300 mb-1">
                                <span className="font-semibold">Category:</span> {purchase.category}
                            </div>
                            <div className="text-sm text-gray-400">
                                <span className="font-semibold">Seller:</span> {purchase.seller}
                            </div>
                        </div>
                    </div>
                ))}
                {filteredPurchases.length === 0 && (
                    <div className="text-center text-gray-400 py-12">No purchases found.</div>
                )}
            </div>
        </div>
    );
}
