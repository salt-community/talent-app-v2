import React from "react";

export default function CvLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full motion-rotate-loop-[1turn]/reset"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
