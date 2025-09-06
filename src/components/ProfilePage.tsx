"use client";

import React from "react";
import Image from "next/image";
import {
  Camera,
  Edit3,
  Package,
  ShoppingBag,
  User,
  Mail,
  Phone,
} from "lucide-react";
import type { ProfilePageProps } from "../types";

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onEditProfile,
  onViewListings,
  onViewPurchases,
  onUpdateProfilePicture,
}) => {
  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdateProfilePicture(file);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-white p-6 text-gray-900">
      <div className="w-full max-w-4xl space-y-8">
        {/* Profile Header Section */}
        <div className="rounded-3xl bg-[#1C1C1E] p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Profile Picture */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="group relative">
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-gray-700 bg-gray-800 shadow-md lg:h-36 lg:w-36">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt="Profile Picture"
                      width={144}
                      height={144}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-700">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                  <Camera className="h-7 w-7 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              </div>
              <button
                onClick={onEditProfile}
                className="mt-5 flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-base font-semibold text-black shadow transition-all duration-300 hover:bg-gray-200"
              >
                <Edit3 className="h-5 w-5" />
                Edit Profile
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-5">
              <div className="text-center lg:text-left">
                <h1 className="mb-1 text-3xl font-extrabold text-white lg:text-4xl">
                  {user.username}
                </h1>
                <p className="mb-3 text-gray-400 italic">
                  {user.bio ?? "No bio available"}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl bg-gray-800 p-4 shadow transition hover:scale-105">
                  <Mail className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium break-all">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 rounded-2xl bg-gray-800 p-4 shadow transition hover:scale-105">
                    <Phone className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl bg-[#1C1C1E] p-8 text-white shadow-2xl">
          <h2 className="mb-7 text-2xl font-bold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <button
              onClick={onViewListings}
              className="flex items-center gap-5 rounded-2xl bg-gray-800 p-7 shadow transition-all duration-300 hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black">
                <Package className="h-7 w-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">My Listings</h3>
                <p className="text-sm text-gray-400">
                  View and manage all your current listings
                </p>
              </div>
            </button>
            <button
              onClick={onViewPurchases}
              className="flex items-center gap-5 rounded-2xl bg-gray-800 p-7 shadow transition-all duration-300 hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">My Purchases</h3>
                <p className="text-sm text-gray-400">
                  View all your previous purchases and orders
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
