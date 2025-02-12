import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { Tag } from "lucide-react";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { Assignment, getAllAssignments } from "@/features/assignments";
import { AddAssignmentForm } from "./add-assignment";

export async function ListAssignments() {
  const assignments = await getAllAssignments();
  if (!assignments) {
    return <p>No assignments found.</p>;
  }
  return (
    <Tabs defaultValue="assignments" className="m-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="add">Add Assignment</TabsTrigger>
      </TabsList>
      <TabsContent value="assignments">
        <Accordion type="single" collapsible>
          {assignments.map((assignment: Assignment) => (
            <AccordionItem key={assignment.id} value={assignment.id}>
              <AccordionTrigger>{assignment.title}</AccordionTrigger>
              <AccordionContent>
                <p>Comment: {assignment.comment}</p>
                <div className="flex mt-2">
                  <Tag />
                  <p className="px-2">
                    {assignment.categories?.join(", ") || "No categories"}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
      <TabsContent value="add">
        <AddAssignmentForm />
      </TabsContent>
    </Tabs>
  );
}
