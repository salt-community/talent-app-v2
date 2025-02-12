import { db } from "@/db";
import { InstructorsDashboard } from "@/features/admin/components/instructors-view";
import { createAssignmentsService } from "@/features/assignments/service";

export default async function InstructorsPage() {
  await createAssignmentsService(db).getAllAssignments();

  return process.env.FF_INSTRUCTORS_DASHBOARD === "ON" ? (
    <InstructorsDashboard />
  ) : null;
}
