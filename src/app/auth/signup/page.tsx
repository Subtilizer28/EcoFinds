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
    <div className="mb-6 flex flex-col items-center">
      <label className="flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#39415c] bg-[#2c3350] transition hover:border-blue-600">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-2 text-center text-sm text-gray-400 select-none">
            Click to add badge/profile photo
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
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
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#131824] px-4 font-sans">
      <h1 className="mb-6 text-3xl font-bold text-white">Sign Up</h1>
      <ProfilePhotoUpload onFileSelected={setProfilePhoto} />
      <div className="w-full max-w-xs rounded-xl bg-[#23293a] p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* ...inputs unchanged... */}
          <div>
            <label
              htmlFor="displayName"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              className="w-full rounded-md border border-[#39415c] bg-[#2c3350] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-[#39415c] bg-[#2c3350] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-[#39415c] bg-[#2c3350] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border border-[#39415c] bg-[#2c3350] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="mb-2 text-center text-sm text-red-500">{error}</div>
          )}
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#3166fc] py-3 text-base font-semibold text-white transition hover:bg-[#254fbf]"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
