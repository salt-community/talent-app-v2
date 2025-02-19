import React from "react";
import StudentCard from "./developer-card";
import { Developer } from "../../types";



export function DeveloperDashboard({ developer }: { developer: Developer }) {
  return (
    <div>
      <StudentCard developer={developer} />
    </div>
  );
}
