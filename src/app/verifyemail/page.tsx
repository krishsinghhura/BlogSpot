"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setverified(true);
    } catch (error: any) {
      seterror(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, [token]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        {verified ? (
          <div>
            <h2 className="text-2xl font-semibold text-green-400">
              Email Verified!
            </h2>
            <p className="mt-2">
              Your email has been successfully verified. You can now log in.
            </p>
            <Link href="/login">
              <button className="mt-4 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">
                Go to Login
              </button>
            </Link>
          </div>
        ) : error ? (
          <div>
            <h2 className="text-2xl font-semibold text-red-400">
              Verification Failed
            </h2>
            <p className="mt-2">Invalid or expired token. Please try again.</p>
            <Link href="/resend-verification">
              <button className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">
                Resend Verification Email
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold">Verifying...</h2>
            <p className="mt-2">Please wait while we verify your email.</p>
          </div>
        )}
      </div>
    </div>
  );
}
