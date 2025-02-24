"use client";
import React from "react";
import { Developer } from "../../types";

export default function Developers({ developer }: { developer: Developer }) {
  async function scoreAssignment() {
    console.log("score assignment");
  }

  return (
    <div className="border-b border-gray-200 last:border-0">
      <div className="py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-white font-medium">
            {developer.name.substring(0, 2)}
          </div>
          <div>
            <div className="font-medium">{developer.name}</div>
            <div className="text-sm text-gray-500">
              @{developer.name || developer.name.toLowerCase()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={scoreAssignment}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            Score
          </button>
        </div>
      </div>
    </div>
  );
}
