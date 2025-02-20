import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
