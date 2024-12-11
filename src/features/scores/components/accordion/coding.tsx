/* import {
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

export function Coding({ scores: scores }: Props) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <ProgressRing percentage={scores.programmingScore} />
          Programming
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col mr-2 pl-8">
            <span className="flex flex-row gap-4 pb-2 items-center">
              <ProgressRing percentage={scores.backend} />
              Backend
            </span>
            <span className="flex flex-row gap-4 pb-2 items-center">
              <ProgressRing percentage={scores.frontend} />
              Frontend
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
 */