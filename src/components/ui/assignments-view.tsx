"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ClassAssignmentForm } from "./class-assignmentform";

export function AssignmentsView() {
  const [subTab, setSubTab] = useState("add");

  return (
    <div className="mt-6">
      <Tabs value={subTab} onValueChange={setSubTab}>
        <TabsList className="gap-4 p-4">
          <TabsTrigger value="add">Add Assignment</TabsTrigger>
          <TabsTrigger value="list">List Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <ClassAssignmentForm />
        </TabsContent>
        <TabsContent value="list">{/* <ListAssignments /> */}</TabsContent>
      </Tabs>
    </div>
  );
}
