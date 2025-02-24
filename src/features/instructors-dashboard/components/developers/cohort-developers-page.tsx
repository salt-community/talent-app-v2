import { Developers } from "./developers";

type Params = {
  params: Promise<{ name: string }>;
};

export async function CohortDevelopersPage({ params }: Params) {
  const { name } = await params;

  return <Developers name={name} />;
}
