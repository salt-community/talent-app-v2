import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { fetchCohortsAction } from "../actions";
import CohortStudents from "./cohort-students";

export async function CohortList() {
  const cohorts = await fetchCohortsAction();
  return (
    <Accordion type="single" collapsible>
      {cohorts.map((cohort) => (
        <AccordionItem key={cohort.id} value={cohort.id}>
          <AccordionTrigger>{cohort.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between">
              <p>{cohort.description}</p>
              <p>{cohort.status}</p>
            </div>
            <CohortStudents cohortId={cohort.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
