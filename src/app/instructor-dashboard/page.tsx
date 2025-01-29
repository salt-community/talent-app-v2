import { InstructorsDashboard } from "@/features/admin/components/instructors-view";

export default async function InstructorsPage() {
  return process.env.FF_INSTRUCTORS_DASHBOARD === "ON" ? (
    <InstructorsDashboard />
  ) : null;
}
