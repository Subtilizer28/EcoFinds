'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Edit3, Package, ShoppingBag, User, Mail, Phone, Calendar } from 'lucide-react';

// Types
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
    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onUpdateProfilePicture(file);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto p-4 lg:p-8">
                {/* Profile Header Section */}
                <div className="rounded-3xl shadow-lg border border-white/80 p-8 mb-8 backdrop-blur-md">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="relative group">
                                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-blue-200 shadow-xl bg-white">
                                    {user.profilePicture ? (
                                        <Image
                                            src={user.profilePicture}
                                            alt="Profile Picture"
                                            width={144}
                                            height={144}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                                            <User className="w-12 h-12 text-blue-400" />
                                        </div>
                                    )}
                                </div>
                                {/* Camera overlay for profile picture upload */}
                                <label className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center cursor-pointer transition-all duration-200">
                                    <Camera className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {/* Edit Button */}
                            <button
                                onClick={onEditProfile}
                                className="mt-5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl shadow hover:from-blue-700 hover:to-green-600 transition-all duration-200 flex items-center gap-2 text-base font-semibold"
                            >
                                <Edit3 className="w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>

                        {/* User Information Section */}
                        <div className="flex-1 space-y-5">
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-1 tracking-tight">
                                    {user.username}
                                </h1>
                                <p className="text-white/60 italic mb-3">{user.bio ?? "No bio available"}</p>
                            </div>

                            {/* User Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 flex items-center gap-3 shadow">
                                    <Mail className="w-6 h-6 text-blue-500" />
                                    <div>
                                        <p className="text-xs text-blue-500">Email</p>
                                        <p className="font-medium text-gray-900 break-all">{user.email}</p>
                                    </div>
                                </div>
                                {user.phone && (
                                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 flex items-center gap-3 shadow">
                                        <Phone className="w-6 h-6 text-green-500" />
                                        <div>
                                            <p className="text-xs text-green-500">Phone</p>
                                            <p className="font-medium text-gray-900">{user.phone}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 flex items-center gap-3 shadow col-span-1 md:col-span-2">
                                    <Calendar className="w-6 h-6 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Member since</p>
                                        <p className="font-medium text-gray-900">test</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <div className="rounded-3xl shadow-lg border border-white p-8">
                    <h2 className="text-2xl font-bold text-white mb-7">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* My Listings Button */}
                        <button
                            onClick={onViewListings}
                            className="p-7 border-2 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50/80 transition-all duration-200 group flex items-center gap-5 shadow"
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200 shadow">
                                <Package className="w-7 h-7 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-lg text-blue-500 mb-1">My Listings</h3>
                                <p className="text-sm text-blue-500">
                                    View and manage all your current listings
                                </p>
                            </div>
                        </button>
                        {/* My Purchases Button */}
                        <button
                            onClick={onViewPurchases}
                            className="p-7 border-2 bg-gradient-to-r from-blue-50 to-blue-100 border-green-100 rounded-2xl hover:border-green-400 hover:bg-green-50/80 transition-all duration-200 group flex items-center gap-5 shadow"
                        >
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200 shadow">
                                <ShoppingBag className="w-7 h-7 text-green-600" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-lg text-green-500 mb-1">My Purchases</h3>
                                <p className="text-sm text-green-500">
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
