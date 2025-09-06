"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa";

// Dummy session for demonstration. Replace with real session logic.
const useSession = () => {
    // Set to null for "not logged in", or an object for "logged in"
    const session = { user: { name: "John Doe" } }; // or null
    return { data: session };
};

const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <nav className="bg-white/80 m-4 shadow-md px-4 py-2 flex items-center justify-between relative rounded-2xl">
            {/* Hamburger Menu */}
            <button
                className="md:hidden text-2xl"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Open menu"
            >
                <FaBars />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center text-xl font-bold">
                <span className="text-green-600">EcoFinds</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center font-bold text-lg">
                <Link href="/products" className="hover:text-green-600">Products</Link>
                {session && (
                    <>
                    <Link href="/my-listings" className="hover:text-green-600">My Listings</Link>
                    <Link href="/addproduct" className="hover:text-green-600">Add Product</Link>
                </>
                )}
            </div>

            {/* Right Side: Cart & Profile/Login */}
            <div className="flex items-center gap-4">
                <Link href="/cart" className="relative text-2xl">
                    <FaShoppingCart />
                    {/* Example cart badge */}
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">2</span>
                </Link>
                <div className="relative">
                    {session ? (
                        <>
                            <button
                                className="text-2xl"
                                onClick={() => setProfileOpen((prev) => !prev)}
                                aria-label="Profile menu"
                            >
                                <FaUserCircle />
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/my-listings"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        My Listings
                                    </Link>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link href="/login" className="text-lg hover:text-green-600">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-10">
                    <Link
                        href="/products"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                    >
                        Products
                    </Link>
                    {session && (
                        <Link
                            href="/my-listings"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            My Listings
                        </Link>
                    )}
                    <Link
                        href="/cart"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                    >
                        Cart
                    </Link>
                    {session ? (
                        <>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;