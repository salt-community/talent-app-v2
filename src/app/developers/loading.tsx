import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
