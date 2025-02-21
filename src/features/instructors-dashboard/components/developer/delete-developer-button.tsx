import { TrashIcon } from "lucide-react";
import React from "react";

export default function DeleteDeveloperButton() {
  return (
    <div>
      <button
        className="text-red-500 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
        aria-label="Delete"
      >
        <TrashIcon size={18} />
      </button>
    </div>
  );
}
