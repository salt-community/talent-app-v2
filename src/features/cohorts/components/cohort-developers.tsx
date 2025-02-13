import { getCohortStudents } from "../actions";

type Props = {
  cohortId: string;
};
export default async function CohortDevelopers({ cohortId }: Props) {
  const CohortDevelopers = await getCohortStudents(cohortId);
  return (
    <div>
      {CohortDevelopers.map((developer, index) => (
        <p key={index}>{developer.name}</p>
      ))}
    </div>
  );
}
