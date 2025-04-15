import React from "react";
import { Star, List, Lock } from "lucide-react";
import { TabType } from "../../types";

interface ScoringTabProps {
  activeTab?: TabType;
  fixListCount: number;
  onTabChange?: (tab: TabType) => void;
}

export function ScoringTab({
  activeTab = "scoring",
  fixListCount,
  onTabChange = () => {},
}: ScoringTabProps) {
  return (
    <div className="flex items-center justify-between w-full rounded-lg  px-4 py-2 border border-gray-200 ">
      <button
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md transition-colors ${
          activeTab === "scoring"
            ? "font-semibold"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => onTabChange("scoring")}
      >
        <Star
          className="w-5 h-5"
          fill={activeTab === "scoring" ? "currentColor" : "none"}
        />
        <span>Scoring</span>
      </button>

      <button
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md transition-colors ${
          activeTab === "fixList"
            ? "font-semibold"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => onTabChange("fixList")}
      >
        <List className="w-5 h-5" />
        <span>Fix List</span>
        <span className="ml-1 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {fixListCount}
        </span>
      </button>

      <button
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md transition-colors ${
          activeTab === "privateNotes"
            ? "font-semibold"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => onTabChange("privateNotes")}
      >
        <Lock className="w-5 h-5" />
        <span>Private Notes</span>
      </button>
    </div>
  );
}
