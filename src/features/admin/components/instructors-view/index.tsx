"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../../../../components/ui/separator";
import { AssignmentsView } from "./assignments-view/assignments-view";

export function InstructorsDashboard() {
  const [tab, setTab] = React.useState("assignments");

  return (
    <section className="p-4">
      <h1 className="mb-4 text-center text-3xl font-extralight p-8">
        Instructor Dashboard
      </h1>

      <Tabs value={tab} onValueChange={setTab} className="text-center">
        <TabsList className="gap-4 p-4">
          <TabsTrigger
            value="assignments"
            className="px-6 py-2 text-l active:weight-bold"
          >
            Assignments
          </TabsTrigger>
          <TabsTrigger
            value="scoring"
            className="px-6 py-2 text-l active:weight-bold"
          >
            Scoring
          </TabsTrigger>
          <TabsTrigger
            value="statistics"
            className="px-6 py-2 text-l active:weight-bold"
          >
            Cohorts
          </TabsTrigger>
          <TabsTrigger
            value="statistics"
            className="px-6 py-2 text-l active:weight-bold"
          >
            Statistics
          </TabsTrigger>
        </TabsList>
        <Separator className="my-8" />
        <AssignmentsView />
      </Tabs>
    </section>
  );
}
