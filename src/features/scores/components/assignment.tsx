import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { ProgressRing } from "./progress-ring";
import { Assignment as AssignmentType } from "../types";
import { EditAssignment } from "./edit-assignment";

type Props = {
  assignment: AssignmentType;
};

export function Assignment({ assignment }: Props) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-96">
      <AccordionItem value="item-1">
        <div>
          <div className="flex pr-2 mt-2 justify-end">
            <EditAssignment assignment={assignment} />
          </div>
          <AccordionTrigger>
            <ProgressRing percentage={assignment.score} />
            <span className="px-4 text-paragraph">{assignment.title}</span>
          </AccordionTrigger>
        </div>

        <AccordionContent>
          <div className="flex flex-col mr-2 pl-8">
            <span className="flex flex-row gap-4 pb-2 items-center pl-1 text-paragraph">
              {assignment.comment}
            </span>
            <span className="flex flex-wrap gap-2 pb-2 items-center">
              {(assignment.tags ?? []).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-500 text-primary-foreground hover:bg-gray-600 cursor-default"
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
