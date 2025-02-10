
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { Tag } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Assignment, getAllAssignments } from "@/features/assignments";

export async function ListAssignments() {

  const assignments =await getAllAssignments()
  if (!assignments) {
    return <p>No assignments found.</p>;
  }

  return (
    <div className="m-6">
      <Tabs>
        <TabsContent value="assignments">
          <TabsTrigger value="add">Add Assignment</TabsTrigger>
        </TabsContent>
      </Tabs>
      <Accordion type="single" collapsible>
        {assignments.map((assignment:Assignment) => (
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
