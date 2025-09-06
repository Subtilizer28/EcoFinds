/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { api } from "~/trpc/react"; // 👈 your typed tRPC client

export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addProducts = api.product.addProducts.useMutation({
    onSuccess: (data) => {
      alert(`✅ Added ${data.count} product(s)!`);
    },
    onError: (err) => {
      alert(`❌ Failed: ${err.message}`);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Allowed condition values
    const allowedConditions = [
      "NEW",
      "LIKE_NEW",
      "VERY_GOOD",
      "GOOD",
      "ACCEPTABLE",
      "FOR_PARTS",
    ] as const;

    // Convert form data to product input
    const rawCondition = (formData.get("condition") as string)?.toUpperCase().replace(/\s+/g, "_");
    const condition = allowedConditions.includes(rawCondition as typeof allowedConditions[number])
      ? (rawCondition as typeof allowedConditions[number])
      : "GOOD"; // fallback or handle error

    const product = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      image: imagePreview ?? "https://via.placeholder.com/300",
      price: Number(formData.get("price")),
      qty: Number(formData.get("qty")),
      condition,
      yearOfManufacture: Number(formData.get("yearOfManufacture")),
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      dimensionL: Number(formData.get("dimensionL")),
      dimensionW: Number(formData.get("dimensionW")),
      dimensionH: Number(formData.get("dimensionH")),
      weight: Number(formData.get("weight")),
      material: formData.get("material") as string,
      color: formData.get("color") as string,
      originalPackaging: formData.get("originalPackaging") === "on",
      manualIncluded: formData.get("manualIncluded") === "on",
      workingConditionDesc: formData.get("workingConditionDesc") as string,
    };

    // Call tRPC mutation
    addProducts.mutate([product]);
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#131824] to-[#1c2133] font-sans">
      <div className="max-w-2xl w-full mx-auto backdrop-blur-lg bg-[#23293a]/80 rounded-3xl shadow-2xl border border-[#39415c] p-10 transition-all duration-500 hover:shadow-indigo-800/40">
        
        {/* Title */}
        <h2 className="text-white text-3xl mb-8 text-center font-semibold tracking-wide">
          Add a New Product
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="flex justify-center mb-6">
            <label
              htmlFor="productImage"
              className={`border-2 border-dashed border-gray-400 rounded-xl w-full max-w-xs h-44 flex flex-col justify-center items-center cursor-pointer text-gray-300 font-medium transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } hover:bg-gray-800 hover:border-indigo-500`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <span className="text-5xl mb-2">📷</span>
                  <span className="text-sm">Upload Product Image</span>
                </>
              )}
            </label>
            <input
              id="productImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Section: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" type="text" placeholder="Product Title" className="input-style" />
            <input name="category" type="text" placeholder="Product Category" className="input-style" />
          </div>

          <textarea name="description" placeholder="Product Description" rows={3} className="input-style"></textarea>

          {/* Section: Pricing & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input name="price" type="number" placeholder="Price" className="input-style" />
            <input name="qty" type="number" placeholder="Quantity" className="input-style" />
          </div>

          {/* Section: Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="condition" className="input-style" defaultValue="">
              <option value="" disabled>
              Select Condition
              </option>
              <option value="NEW">New</option>
              <option value="LIKE_NEW">Like New</option>
              <option value="VERY_GOOD">Very Good</option>
              <option value="GOOD">Good</option>
              <option value="ACCEPTABLE">Acceptable</option>
              <option value="FOR_PARTS">For Parts</option>
            </select>
            <input name="yearOfManufacture" type="number" placeholder="Year of Manufacture" className="input-style" />
            <input name="brand" type="text" placeholder="Brand" className="input-style" />
            <input name="model" type="text" placeholder="Model" className="input-style" />
            <input name="dimensionL" type="number" placeholder="Length" className="input-style" />
            <input name="dimensionW" type="number" placeholder="Width" className="input-style" />
            <input name="dimensionH" type="number" placeholder="Height" className="input-style" />
            <input name="weight" type="number" placeholder="Weight" className="input-style" />
            <input name="material" type="text" placeholder="Material" className="input-style" />
            <input name="color" type="text" placeholder="Color" className="input-style" />
            </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3 text-gray-300">
            <label className="flex items-center gap-3 cursor-pointer">
              <input name="originalPackaging" type="checkbox" className="accent-indigo-500 w-5 h-5" />
              Original Packaging
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input name="manualIncluded" type="checkbox" className="accent-indigo-500 w-5 h-5" />
              Manual/Instructions Included
            </label>
          </div>

          <textarea name="workingConditionDesc" placeholder="Working Condition Description" rows={3} className="input-style"></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={addProducts.status === "pending"}
            className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/40 disabled:opacity-50"
          >
            {addProducts.status === "pending" ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>

      {/* Custom Input Styling */}
      <style jsx>{`
        .input-style {
          background: transparent;
          border-bottom: 2px solid #666;
          color: white;
          padding: 10px;
          outline: none;
          font-size: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .input-style::placeholder {
          color: #aaa;
        }
        .input-style:focus {
          border-color: #6366f1; /* Indigo */
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </section>
  );
}
