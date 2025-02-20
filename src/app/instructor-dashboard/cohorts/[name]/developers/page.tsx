import { DeveloperDashboard } from "@/features";

type Params = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Params) {
  const { name } = await params;

  return (
    <div>
      <DeveloperDashboard name={name} />
    </div>
  );
}
