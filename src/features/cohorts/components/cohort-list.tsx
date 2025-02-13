import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { fetchCohortsAction } from "../actions";
import CohortDevelopers from "./cohort-developers";
import CohortFormWrapper from "./cohort-form-wrapper";
import { Cohort } from "../types";

export async function CohortList() {
  const cohorts = await fetchCohortsAction();
  return (
    <Accordion type="single" collapsible className="w-11/12 md:w-5/6 lg:w-4/6">
      {cohorts.map((cohort: Cohort) => (
        <AccordionItem key={cohort.id} value={cohort.id!}>
          <AccordionTrigger>{cohort.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between">
              <p>{cohort.description}</p>
              <p>{cohort.status}</p>
            </div>
            <CohortFormWrapper cohortId={cohort.id!} />
            <CohortDevelopers cohortId={cohort.id!} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
