import { getCohortStudents } from "../actions";

type Props = {
  cohortId: string;
};
export default async function CohortDevelopers({ cohortId }: Props) {
  const CohortDevelopers = await getCohortStudents(cohortId);
  if (CohortDevelopers.length === 0) {
    return (
      <div className="ml-1 mt-2">
        <p className="font-semibold">Developers</p>
        <p className="text-xs">No developers have been added to this cohort</p>
      </div>
    );
  }
  return (
    <div className="ml-1 mt-2">
      <p className="font-semibold">Developers</p>
      {CohortDevelopers.map((developer, index) => (
        <p key={index} className="text-xs">
          {developer.name}
        </p>
      ))}
    </div>
  );
}
