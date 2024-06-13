"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log(response);
      console.log("signup success");
      router.push("/login");
    } catch (error) {
      console.log("signup failed");
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
            htmlFor="username"
            className="block text-gray-400 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            placeholder="Enter your username"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
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
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="mt-6">
          <Link
            href="/login"
            className="flex-end text-white/90 hover:text-white/50"
          >
            Visit Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
