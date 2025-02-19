// import { AssignmentsDashboard } from "@/features";

import { AssignmentsDashboard } from "@/features";

type Params = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Params) {
  const { name } = await params;

  return <AssignmentsDashboard name={name} />;
}
