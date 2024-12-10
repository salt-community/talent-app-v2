import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProgressRing } from "../progress-ring";
import { CompleteScores } from "../../types";

type Props = {
  scores: CompleteScores;
};

export function Communication({ scores: scores }: Props) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <ProgressRing percentage={scores.communicationScore} />
          Communication
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col mr-2 pl-8">
            <span className="flex flex-row gap-4 pb-2 items-center">
              <ProgressRing
                percentage={scores.individualCommunication}
              />
              Conversation
            </span>
            <span className="flex flex-row gap-4 pb-2 items-center">
              <ProgressRing percentage={scores.teamCollaboration} />
              Team Collaboration
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}