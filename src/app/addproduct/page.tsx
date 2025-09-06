import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-8 text-white">
        {/* Logo */}
        <span className="font-handwritten text-2xl">Logo</span>
        <div className="flex items-center gap-6">
          {/* Cart Icon with notification */}
          <div className="relative">
            <span className="text-3xl">🛒</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">!</span>
          </div>
          {/* Profile Circle */}
          <div className="w-10 h-10 border border-white rounded-full"></div>
        </div>
      </header>
      
      {/* Main Form Container */}
      <div className="bg-black border border-white rounded-xl w-full max-w-md p-6">
        {/* Section Title */}
        <h2 className="text-white text-xl mb-6 font-handwritten">Add a new Product</h2>
        
        {/* Product Form */}
        <form className="flex flex-col gap-4">
          {/* Image upload */}
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="productImage" className="border border-white rounded-lg px-6 py-6 text-white cursor-pointer font-handwritten">
              Add product<br />Image
            </label>
            <input id="productImage" type="file" className="hidden" />
          </div>
          
          {/* Fields */}
          <input type="text" placeholder="Product Title" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="text" placeholder="Product Category" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <textarea placeholder="Product Description" className="bg-transparent border-b border-white text-white placeholder-white outline-none"></textarea>
          <input type="number" placeholder="Price" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="number" placeholder="Quantity" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <select className="bg-transparent border-b border-white text-white outline-none">
            <option value="">Condition</option>
            <option>New</option>
            <option>Used</option>
            <option>Refurbished</option>
          </select>
          <input type="number" placeholder="Year of Manufacture" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="text" placeholder="Brand" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="text" placeholder="Model" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="text" placeholder="Dimensions (Length, Width, Height)" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="number" placeholder="Weight" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="text" placeholder="Material" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          <input type="text" placeholder="Color" className="bg-transparent border-b border-white text-white placeholder-white outline-none" />
          
          {/* Checkboxes */}
          <label className="flex items-center gap-2 text-white">
            <input type="checkbox" className="accent-white" />
            Original Packaging
          </label>
          <label className="flex items-center gap-2 text-white">
            <input type="checkbox" className="accent-white" />
            Manual/Instructions Included
          </label>
          
          <textarea placeholder="Working Condition Description" className="bg-transparent border-b border-white text-white placeholder-white outline-none"></textarea>
          
          {/* Add Item Button */}
          <button type="submit" className="mt-6 border border-white rounded-lg py-2 text-white font-handwritten hover:bg-white hover:text-black transition-colors">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
