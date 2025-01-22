"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "./separator";

export function AssignmentsDashboard() {
  const [tab, setTab] = React.useState("assignments");

  return (
    <section className="p-4">
      <h1 className="mb-4 text-center text-3xl font-extralight p-8">
        Instructor Dashboard
      </h1>

      <Tabs value={tab} onValueChange={setTab} className="text-center">
        <TabsList className="gap-4 p-4">
          <TabsTrigger value="assignments" className="px-6 py-2 text-l">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="scoring" className="px-6 py-2 text-l">
            Scoring
          </TabsTrigger>
          <TabsTrigger value="statistics" className="px-6 py-2 text-l">
            Statistics
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator className="my-5" />
    </section>
  );
}
