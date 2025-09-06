/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import React, { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { useParams } from 'next/navigation'; 

export default function ProductPage() {

  const { id } = useParams<{ id: string }>(); 
  const { data: productData = [] } = api.product.getProducts.useQuery();
  const [isVisible, setIsVisible] = useState(false);
  const product = productData.find((p) => p.id === Number(id));

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!product) return <div>Product not found</div>;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 font-sans text-gray-900">
      <div className="max-w-6xl w-full rounded-3xl bg-white shadow-xl p-12 flex flex-col lg:flex-row gap-16">
        {/* Main Product Image */}
        <div className="lg:w-1/2 w-full border border-gray-200 rounded-3xl bg-gray-100 flex justify-center items-center h-[480px] shadow-inner">
          {/* <img
            alt="ecommerce"
            className={`w-full h-full object-contain rounded-3xl transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            src={product.image}
          /> */}
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-sm tracking-widest text-gray-500 mb-3 font-semibold">{product.brand}</h2>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          {/* Price & Button */}
          <div className="flex items-center gap-6">
            <span className="text-4xl font-bold text-gray-900">₹{product.price}.00</span>
            <button
              className="ml-auto rounded-xl bg-black px-10 py-4 text-white text-lg font-semibold shadow-lg hover:bg-gray-800 transition"
              onClick={() => {
              // Get existing cart from cookies
              const cart = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "[]");
              // Add current product id to cart
              if (!cart.includes(product.id)) {
                cart.push(product.id);
                document.cookie = `cart=${JSON.stringify(cart)}; path=/; max-age=2592000`;
              }
              alert('Added to cart!');
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
