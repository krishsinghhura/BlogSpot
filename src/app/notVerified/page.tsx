"use client";

import Link from "next/link";
import React from "react";

export default function NotVerifiedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-red-400">
          Email Not Verified
        </h2>
        <p className="mt-2">Please verify your email before logging in</p>

        <div className="mt-4 flex flex-col gap-3">
          <Link href="/signup">
            <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
              Sign Up with new mail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
