"use client";

import { useAssignments } from "@/features/assignments/assignments-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";

export function ListAssignments() {
  const { assignments, loadAssignments } = useAssignments();
  const [tab, setTab] = useState("add");

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  if (!assignments?.length) {
    return <p>No assignments found.</p>;
  }

  return (
    <div className="mt-6">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="assignments">
          <TabsTrigger value="add">Add Assignment</TabsTrigger>
        </TabsContent>
      </Tabs>
      <Accordion type="single" collapsible>
        {assignments.map((assignment) => (
          <AccordionItem key={assignment.id} value={assignment.id}>
            <AccordionTrigger>{assignment.title}</AccordionTrigger>
            <AccordionContent>
              <p>Comment: {assignment.comment}</p>
              <Tag>Tags: {assignment.tags.join(", ")}</Tag>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
