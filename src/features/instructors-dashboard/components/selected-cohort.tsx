import { instructorService } from "../instance";

type Props = {
  cohortId: string;
};

export async function SelectedCohort({ cohortId }: Props) {
  const cohort = await instructorService.getCohortById(cohortId);

  return <h1>{cohort.description}</h1>;
}
