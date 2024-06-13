"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  //   const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  //   useEffect(() => {
  //     //<======================================>
  //     // <------------Using NextJs--------->
  //     //<======================================>
  //     const { query } = router;
  //     const urlTokenNextJS = query.token;
  //     //<======================================>
  //     // <------------Token needs to set--------->
  //     //<======================================>
  //     // setToken(urlToken || "");
  //   }, [router]);

  useEffect(() => {
    // <======================================>
    // <------------Using Javascript--------->
    // <======================================>
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-2">
      <h1 className="text-4xl font-bold text-white mb-6">Verify Email</h1>
      <h2 className="p-2 mb-6 bg-orange-500 text-black rounded">
        {token ? `${token}` : "No token"}
      </h2>

      {verified && (
        <div className="text-center">
          <h2 className="text-2xl text-green-500 mb-4">Email Verified</h2>
          <Link href="/login">
            <a className="text-blue-500 hover:text-blue-400">Login</a>
          </Link>
        </div>
      )}

      {error && (
        <div className="text-center">
          <h2 className="text-2xl bg-red-500 text-black p-2 rounded">Error</h2>
        </div>
      )}
    </div>
  );
};
export default VerifyEmailPage;
