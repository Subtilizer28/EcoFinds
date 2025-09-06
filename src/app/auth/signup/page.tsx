/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ProfilePhotoUpload({
  onFileSelected,
}: {
  onFileSelected: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setPreview(null);
      onFileSelected(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
    onFileSelected(file);
  };

  return (
    <div className="mb-8 flex flex-col items-center">
      <label className="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-700 bg-gray-800 transition hover:border-blue-600">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-2 text-center text-sm text-gray-400 select-none">
            Click to add profile photo
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="pointer-events-none absolute right-2 bottom-2 rounded-full bg-blue-600 p-1 text-white shadow-lg">
          ✎
        </span>
      </label>
    </div>
  );
}

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    void router.push("/");
    return null;
  }

  // tRPC mutation
  const createUser = api.user.create.useMutation();

  // Helper to convert file to data URL
  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to read file"));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!displayName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    let image: string | undefined = undefined;
    if (profilePhoto) {
      try {
        image = await fileToDataUrl(profilePhoto);
      } catch {
        setError("Failed to read profile photo");
        setLoading(false);
        return;
      }
    }

    createUser.mutate(
      {
        name: displayName,
        email,
        password,
        image,
      },
      {
        onSuccess: () => {
          alert("Registration successful!");
          // Optionally redirect or clear form
        },
        onError: (err) => {
          setError(err.message || "Registration failed");
        },
        onSettled: () => setLoading(false),
      }
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 font-sans">
      <h1 className="mb-8 text-4xl font-extrabold text-gray-900">Sign Up</h1>
      <ProfilePhotoUpload onFileSelected={setProfilePhoto} />
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="displayName"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Your name"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="text-center text-sm font-semibold text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-black py-3 text-lg font-semibold text-white shadow-lg hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
