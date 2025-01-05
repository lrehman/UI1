"use client"; // Required for client-side hooks like useEffect

import { useEffect, useState  } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [startZoom, setStartZoom] = useState(false);

  useEffect(() => {
    // Trigger animation 
    const timer = setTimeout(() => {
      setStartZoom(true); // Start the zoom effect
      setTimeout(() => {
        router.push("/login"); // Redirect after the zoom effect
      }, 1500); // (1.5 seconds)
    }, 3000); // 3 seconds transition

    return () => clearTimeout(timer); // Cleanup timer
  }, [router]);

  return (
    
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden ${
        startZoom ? "animate-full-zoom" : ""
      }`}
    >
      <img
        src="/logo.png"
        alt="Landing Logo"
        className="w-120 h-96 border-4 border-black rounded-lg animate-zoom-in"
      />
    </div>
    
  );
}
