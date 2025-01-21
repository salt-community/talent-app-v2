export default async function AssignmentsPage() {
  return process.env.FF_ASSIGNMENTS_DASHBOARD === "ON" ? (
    <div>TODO: Assignments Dashboard</div>
  ) : null;
}
