"use client";

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
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
import { signOut } from "next-auth/react";

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
        if (file) onUpdateProfilePicture(file);
    };

    return (
        <StyledWrapper>
            <div className="min-h-screen bg-white text-black flex justify-center items-start p-6">
                <div className="max-w-4xl w-full space-y-6 font-sans">
                    {/* Profile Header Section */}
                    <section className="rounded-3xl bg-white shadow-md p-6 flex flex-col lg:flex-row gap-6 border border-gray-200">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-sm bg-gray-100 flex items-center justify-center">
                                    {user.profilePicture ? (
                                        <Image
                                            src={user.profilePicture}
                                            alt="Profile Picture"
                                            width={112}
                                            height={112}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <User className="w-12 h-12 text-gray-400" />
                                    )}
                                </div>
                                <label className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 flex items-center justify-center cursor-pointer transition duration-300">
                                    <Camera className="w-6 h-6 text-black opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
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
                                className="mt-4 px-5 py-2 bg-black text-white rounded-full shadow-sm hover:bg-gray-800 transition duration-300 flex items-center gap-2 font-semibold text-base"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>
                        {/* User Info */}
                        <div className="flex-1 space-y-4">
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl font-extrabold mb-1">{user.username}</h1>
                                <p className="text-gray-600 italic text-base max-w-lg mx-auto lg:mx-0">
                                    {user.bio ?? 'No bio available'}
                                </p>
                            </div>
                            {/* Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-3xl p-4 flex items-center gap-3 border border-gray-200 shadow-sm select-text">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs uppercase text-gray-500 tracking-wide">Email</p>
                                        <p className="font-medium text-base break-all">{user.email}</p>
                                    </div>
                                </div>
                                {user.phone && (
                                    <div className="bg-gray-50 rounded-3xl p-4 flex items-center gap-3 border border-gray-200 shadow-sm">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs uppercase text-gray-500 tracking-wide">Phone</p>
                                            <p className="font-medium text-base">{user.phone}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="bg-gray-50 rounded-3xl p-4 flex items-center gap-3 border border-gray-200 shadow-sm">
                                    <button
                                        onClick={() => signOut()}
                                        className="flex items-center gap-2 text-red-600 font-semibold text-base hover:underline focus:outline-none"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Quick Actions */}
                    <section className="rounded-3xl bg-white shadow-md p-6 border border-gray-200 font-sans">
                        <h2 className="text-2xl font-semibold text-black mb-5">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={onViewListings}
                                className="p-6 bg-black rounded-3xl shadow-lg transition transform duration-300 bounce-button flex items-center gap-5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black"
                            >
                                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-lg text-white">My Listings</h3>
                                    <p className="text-gray-300 text-sm max-w-xs">
                                        View and manage all your current listings
                                    </p>
                                </div>
                            </button>
                            <button
                                onClick={onViewPurchases}
                                className="p-6 bg-black rounded-3xl shadow-lg transition transform duration-300 bounce-button flex items-center gap-5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black"
                            >
                                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
                                    <ShoppingBag className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-lg text-white">My Purchases</h3>
                                    <p className="text-gray-300 text-sm max-w-xs">
                                        View all your previous purchases and orders
                                    </p>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <style jsx>{`
                .bounce-button:hover {
                    animation: bounce 0.6s;
                }
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }
            `}</style>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div``;
export default ProfilePage;
