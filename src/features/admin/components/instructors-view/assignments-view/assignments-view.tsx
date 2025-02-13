import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tag } from "lucide-react";
import { Assignment } from "@/features/assignments";
import { AddAssignmentForm } from "./add-assignment";
import { adminService } from "../../../instance";

export async function ListAssignments() {
  const assignments = await adminService.getAllAssignments();
  const cohorts = await adminService.getAllCohorts();

  if (!assignments) {
    return <p>No assignments found.</p>;
  }

  return (
    <>
      <h1 className="text-center text-2xl py-6 font-bold">Assignments</h1>
      <div className="flex justify-center">
        <Accordion
          type="single"
          className="w-11/12 md:w-5/6 lg:w-4/6"
          collapsible
        >
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
      </div>
      <div className="flex justify-center">
        <AddAssignmentForm cohorts={cohorts} />
      </div>
    </>
  );
}
