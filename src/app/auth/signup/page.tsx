'use client';
import React, { useState } from 'react';

function ProfilePhotoUpload({ onFileSelected }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPreview(null);
      onFileSelected(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    onFileSelected(file);
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <label className="cursor-pointer bg-[#2c3350] border border-[#39415c] rounded-full w-28 h-28 flex justify-center items-center overflow-hidden hover:border-blue-600 transition">
        {preview ? (
          <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm text-center px-2 select-none">
            Click to add badge/profile photo
          </span>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!displayName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    // For demo, show alert. Submit logic here.
    alert(`Welcome, ${displayName}!\nProfile photo selected: ${profilePhoto ? 'Yes' : 'No'}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#131824] font-sans px-4">
      {/* Heading */}
      <h1 className="text-white text-3xl font-bold mb-6">Sign Up</h1>

      {/* Profile Photo Upload */}
      <ProfilePhotoUpload onFileSelected={setProfilePhoto} />

      {/* Form Card */}
      <div className="w-full max-w-xs rounded-xl bg-[#23293a] p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="displayName" className="block mb-1 text-gray-300 text-sm font-medium">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              className="w-full px-4 py-3 rounded-md bg-[#2c3350] border border-[#39415c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-300 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-md bg-[#2c3350] border border-[#39415c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-300 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-md bg-[#2c3350] border border-[#39415c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-gray-300 text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-3 rounded-md bg-[#2c3350] border border-[#39415c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="text-red-500 text-center text-sm mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-md bg-[#3166fc] text-white text-base font-semibold hover:bg-[#254fbf] transition"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
