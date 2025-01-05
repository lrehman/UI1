"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StartAction() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animations on page load for buttons only
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: 'url("/logo.png")',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-2 gap-8 max-w-4xl">
        {[
          { text: "Create Project", action: () => router.push("/startaction/createproject") },
          { text: "Open Project", action: () => router.push("/view") }, // Navigate to "View"
        ].map((item, index) => (
          <button
            key={index}
            onClick={item.action} // Call the associated action
            className={`flex items-center justify-center w-48 h-24 text-xl font-bold text-black bg-white border-2 border-black rounded-md shadow-lg transform transition-transform duration-500 ease-out hover:scale-105 ${
              isLoaded ? `animate-button-delay-${index}` : ""
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}
