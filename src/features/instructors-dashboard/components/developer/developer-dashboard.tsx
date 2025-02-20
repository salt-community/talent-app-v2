import React from "react";
import StudentCard from "./developer-card";
import { Developer } from "../../types";
import AddDeveloperButton from "./add-developer-button";

export function DeveloperDashboard({ developers }: { developers: Developer }) {
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-semibold">Developers</h2>
        <div className="bg-green-600 text-white px-4 py-1 rounded-md flex items-center gap-2">
          <AddDeveloperButton />
        </div>
      </div>
      <StudentCard developer={developers} />
    </div>
  );
}
