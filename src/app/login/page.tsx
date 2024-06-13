"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log(response);
      console.log("login success");
      router.push("/profile");
    } catch (error) {
      console.log("login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          {loading ? "Processing..." : "Sign Up"}
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-400 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-400 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            placeholder="Enter your password"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          type="button"
          className={`w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="mt-6">
          <Link
            href="/Signup"
            className="flex-end text-white/90 hover:text-white/50"
          >
            Visit Signup Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
