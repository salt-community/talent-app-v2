"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Assignments } from "@/features/assignments/components/accordion";

export function InstructorsDashboard() {
  const [tab, setTab] = useState("assignments");

  return (
    <section className="p-4">
      <h1 className="mb-4 text-center text-3xl font-extralight p-8">
        Instructor Dashboard
      </h1>

      <Tabs value={tab} onValueChange={setTab} className="text-center">
        <TabsList className="gap-4 p-4">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="scoring">Scoring</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <Separator className="my-8" />

        <TabsContent value="assignments">
          <Assignments />
        </TabsContent>

        <TabsContent value="scoring">
          {/* <ScoringView /> */}
          <p>Scoring TBD...</p>
        </TabsContent>

        <TabsContent value="cohorts">
          {/* <CohortsView /> */}
          <p>Cohorts TBD...</p>
        </TabsContent>

        <TabsContent value="statistics">
          {/* <StatisticsView /> */}
          <p>Statistics TBD...</p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
