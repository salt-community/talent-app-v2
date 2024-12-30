import { Post } from "@/features";

export default async function Page(props: {
  params: Promise<{ devId: string }>;
}) {
  const params = await props.params;
  const developerId = params.devId;

  return <Post developerId={developerId} />;
}
