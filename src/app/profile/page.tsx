"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // If no user is logged in, redirect to login
      router.push("/login");
    }
    setIsLoading(false); // Finish loading
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove only the username
    router.push("/login"); // Redirect to the login page
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center">Your Profile</h1>
        

        {username ? (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">Username:</p>
            <p className="text-xl font-bold text-gray-900">{username}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">No user data found.</p>
        )}

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
