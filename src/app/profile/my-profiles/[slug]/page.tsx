import { CreateDeveloperProfileCard } from "@/features";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  return <CreateDeveloperProfileCard slug={slug} />;
}
