'use client';

import React from 'react';
import Image from 'next/image';
import {
  Camera,
  Edit3,
  Package,
  ShoppingBag,
  User,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';

interface UserProfile {
  id: string;
  profilePicture?: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  joinDate: string;
}

interface ProfilePageProps {
  user: UserProfile;
  onEditProfile: () => void;
  onViewListings: () => void;
  onViewPurchases: () => void;
  onUpdateProfilePicture: (file: File) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onEditProfile,
  onViewListings,
  onViewPurchases,
  onUpdateProfilePicture,
}) => {
  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdateProfilePicture(file);
    }
  };

  const formattedJoinDate = new Date(user.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 flex justify-center items-start p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Profile Header Section */}
        <div className="rounded-3xl shadow-2xl bg-[#1C1C1E] text-white p-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-gray-700 shadow-md bg-gray-800">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt="Profile Picture"
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Camera className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
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
                className="mt-5 px-6 py-2.5 bg-white text-black rounded-full shadow hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 text-base font-semibold"
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-5">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-1">
                  {user.username}
                </h1>
                <p className="text-gray-400 italic mb-3">
                  {user.bio ?? 'No bio available'}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-2xl p-4 flex items-center gap-3 shadow hover:scale-105 transition">
                  <Mail className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium break-all">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="bg-gray-800 rounded-2xl p-4 flex items-center gap-3 shadow hover:scale-105 transition">
                    <Phone className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
                <div className="bg-gray-800 rounded-2xl p-4 flex items-center gap-3 shadow col-span-1 md:col-span-2 hover:scale-105 transition">
                  <Calendar className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Member since</p>
                    <p className="font-medium">{formattedJoinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl shadow-2xl bg-[#1C1C1E] text-white p-8">
          <h2 className="text-2xl font-bold mb-7">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={onViewListings}
              className="p-7 bg-gray-800 rounded-2xl hover:scale-105 transition-all duration-300 shadow flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">My Listings</h3>
                <p className="text-sm text-gray-400">
                  View and manage all your current listings
                </p>
              </div>
            </button>
            <button
              onClick={onViewPurchases}
              className="p-7 bg-gray-800 rounded-2xl hover:scale-105 transition-all duration-300 shadow flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">My Purchases</h3>
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
