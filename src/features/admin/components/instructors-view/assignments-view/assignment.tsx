"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";

import { EditAssignmentForm } from "@/features/assignments/components/edit-assignment";
import { ProgressRing } from "@/features/assignments/components/progress-ring";
import type { Assignment } from "@/features/assignments/types";

type Props = {
  assignment: Assignment;
};

export function Assignment({ assignment }: Props) {
  return (
    <Accordion type="single" collapsible className="mx-auto">
      <AccordionItem value="item-1">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-end pr-2 mt-2">
            <EditAssignmentForm assignment={assignment} />
          </div>

          <AccordionTrigger>
            <ProgressRing percentage={assignment.score ?? 0} />
            <span className="px-4 text-paragraph">{assignment.title}</span>
          </AccordionTrigger>
        </div>

        <AccordionContent>
          <div className="flex flex-col pl-8 mr-2">
            <span className="flex flex-row gap-4 items-center pb-2 pl-1 text-paragraph">
              {assignment.comment}
            </span>

            <span className="flex flex-wrap gap-2 items-center pb-2">
              {(assignment.tags ?? []).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors 
                             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                             border-transparent bg-gray-500 text-primary-foreground hover:bg-gray-600 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
