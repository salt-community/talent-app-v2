import { Post } from "@/features";

export default async function Page(props: {
  params: Promise<{ developerProfileId: string }>;
}) {
  const params = await props.params;
  const developerProfileId = params.developerProfileId;

  return <Post developerProfileId={developerProfileId} />;
}
