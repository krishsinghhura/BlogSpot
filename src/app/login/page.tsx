"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleForgotPassword = () => {
    router.push("/password-body");
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", user);
      if (response.data.isVerfied) {
        Cookies.set("token", response.data.token);
        router.push("/");
      } else {
        router.push("/notVerified");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error in logging in");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white">
            Sign in to your Account
          </h2>

          <form onSubmit={login}>
            <div>
              <label className="block mt-4 text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mt-4 text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
          </form>

          <button
            type="button"
            className="w-full p-2 mt-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>

          <p className="text-sm text-gray-400 text-center mt-4">
            Don't have an account?
          </p>
          <Link href="/signup">
            <button className="w-full p-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Go to Signup
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
