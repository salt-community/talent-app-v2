"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AssignmentsDashboard() {
  const [tab, setTab] = React.useState("assignments");

  return (
    <section className="p-6">
      <h1 className="mb-4 text-xl font-bold">Instructor Dashboard</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="scoring">Scoring</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  );
}
