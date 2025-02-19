import { H1 } from "@/components";
import { instructorService } from "../instance";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  name: string;
};

export async function AssignmentsDashboard({ name }: Props) {
  const cohort = await instructorService.getAllCohorts();
  const foundCohort = cohort.find((cohort) => cohort.name === name);

  if (!foundCohort) notFound();
  const cohortId = foundCohort.id;

  const assignment = await instructorService.getAssignmentsByCohortId(cohortId);

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 py-4 gap-4">
      <div className="md:flex md:justify-between">
        <H1>Assignments</H1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md justify-between mt-2 md:mt-0">
          {assignment.map((assignment) => (
            <Link
              href={`/instructor-dashboard/cohorts/${foundCohort.name}/assignments/${assignment.title}`}
              className="py-1 px-4 rounded-md text-paragraphLight "
              key={assignment.id}
            >
              {assignment.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
