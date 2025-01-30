import { db } from "@/db";
import { Assignment } from "@/features";
import { InstructorsDashboard } from "@/features/admin/components/instructors-view";
import { AssignmentsProvider } from "@/features/assignments/assignments-context";
import { createAssignmentsService } from "@/features/assignments/service";

export default async function InstructorsPage() {
  const assignments: Assignment[] =
    await createAssignmentsService(db).getAllAssignments();

  return process.env.FF_INSTRUCTORS_DASHBOARD === "ON" ? (
    <AssignmentsProvider initialAssignments={assignments}>
      <InstructorsDashboard />
    </AssignmentsProvider>
  ) : null;
}
