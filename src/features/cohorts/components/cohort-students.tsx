import { getCohortStudents } from "../actions";

type Props = {
  cohortId: string;
};
export default async function CohortStudents({ cohortId }: Props) {
  const CohortStudents = await getCohortStudents(cohortId);
  console.log("students", CohortStudents);

  return (
    <div>
      {CohortStudents.map((student, index) => (
        <p key={index}>{student.name}</p>
      ))}
    </div>
  );
}
