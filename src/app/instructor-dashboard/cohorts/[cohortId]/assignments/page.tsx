import { AssignmentsDashboard } from "@/features";

type Params = {
  params: Promise<{ cohortId: string }>;
};

export default async function Page({ params }: Params) {
  const { cohortId } = await params;

  return <AssignmentsDashboard cohortId={cohortId} />;
}
