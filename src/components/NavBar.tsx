"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(Cookies.get("token") || "");
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link href="/" className="text-xl font-bold">
          BlogSpot
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          {token && (
            <Link href="/profile" className="hover:text-blue-400">
              Profile
            </Link>
          )}
          {!token ? (
            <>
              <Link href="/signup" className="hover:text-blue-400">
                Signup
              </Link>
              <Link href="/login" className="hover:text-blue-400">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-sm border px-3 py-1 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 bg-gray-800 p-4 rounded-md">
          <Link href="/" className="block hover:text-blue-400">
            Home
          </Link>
          {token && (
            <Link href="/profile" className="block hover:text-blue-400">
              Profile
            </Link>
          )}
          {!token ? (
            <>
              <Link href="/signup" className="block hover:text-blue-400">
                Signup
              </Link>
              <Link href="/login" className="block hover:text-blue-400">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
