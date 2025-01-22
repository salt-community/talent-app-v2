import { AssignmentsDashboard } from "@/components/ui/assignments-dashboard";

export default async function AssignmentsPage() {
  return process.env.FF_ASSIGNMENTS_DASHBOARD === "ON" ? (
    <AssignmentsDashboard />
  ) : null;
}
