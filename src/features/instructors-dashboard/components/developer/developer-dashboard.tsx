import React from "react";
import StudentCard from "./developer-card";
import { Developer } from "../../types";

export function DeveloperDashboard({ developers }: { developers: Developer }) {
  return (
    <div>
      <StudentCard developer={developers} />
    </div>
  );
}
