'use client';
import { useEffect, useState } from 'react';

export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#131824] to-[#1c2133] font-sans">
      <div className="max-w-2xl w-full mx-auto backdrop-blur-lg bg-[#23293a]/80 rounded-3xl shadow-2xl border border-[#39415c] p-10 transition-all duration-500 hover:shadow-indigo-800/40">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
         
          <div className="flex items-center gap-6">
            <div className="relative text-2xl cursor-pointer text-white">
             

            </div>
            <div className="w-10 h-10 border border-white rounded-full cursor-pointer hover:scale-105 transition-transform"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-3xl mb-8 text-center font-semibold tracking-wide">
          Add a New Product
        </h2>

        {/* Form */}
        <form
          className="flex flex-col gap-6"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
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
            <input type="text" placeholder="Product Title" className="input-style" />
            <input type="text" placeholder="Product Category" className="input-style" />
          </div>

          <textarea placeholder="Product Description" rows={3} className="input-style"></textarea>

          {/* Section: Pricing & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price" className="input-style" />
            <input type="number" placeholder="Quantity" className="input-style" />
          </div>

          {/* Section: Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Condition" className="input-style" />
            <input type="number" placeholder="Year of Manufacture" className="input-style" />
            <input type="text" placeholder="Brand" className="input-style" />
            <input type="text" placeholder="Model" className="input-style" />
            <input type="text" placeholder="Dimensions (L × W × H)" className="input-style" />
            <input type="number" placeholder="Weight" className="input-style" />
            <input type="text" placeholder="Material" className="input-style" />
            <input type="text" placeholder="Color" className="input-style" />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3 text-gray-300">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500 w-5 h-5" />
              Original Packaging
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500 w-5 h-5" />
              Manual/Instructions Included
            </label>
          </div>

          <textarea placeholder="Working Condition Description" rows={3} className="input-style"></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/40"
          >
            Add Item
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
