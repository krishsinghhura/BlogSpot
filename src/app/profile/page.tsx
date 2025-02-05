"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/NavBar";

interface MyJwtPayload extends JwtPayload {
  email: string;
  name: string;
}

export default function Profile() {
  const [data, setData] = useState<any>({});
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        setEmail(decoded.email); // Set email state

        const response = await axios.post("/api/users/profile", {
          email: decoded.email,
        });
        setData(response.data as any);
      } else {
        console.log("No token found");
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    Cookies.set("token", "");
    router.push("/login");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white">
            User Profile
          </h2>

          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {data.username}
            </h3>
            <p className="text-gray-400">{data.email}</p>
          </div>

          {message && <p className="text-green-500 text-center">{message}</p>}

          <div className="space-y-3">
            <Link href={`/profile/reset-password`}>
              <button className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Edit
              </button>
            </Link>

            <button
              className="w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
