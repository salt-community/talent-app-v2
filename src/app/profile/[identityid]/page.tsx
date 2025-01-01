import { CreateDeveloperProfileCard } from "@/features";

type Params = {
  params: Promise<{ identityid: string }>;
};

export default async function Page({ params }: Params) {
  const { identityid } = await params;

  return <CreateDeveloperProfileCard identityid={identityid} />;
}
