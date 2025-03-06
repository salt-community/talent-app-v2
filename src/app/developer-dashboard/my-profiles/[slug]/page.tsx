import { CreateDeveloperProfileCard } from "@/features/developer-profiles";


type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  return <CreateDeveloperProfileCard slug={slug} />;
}
