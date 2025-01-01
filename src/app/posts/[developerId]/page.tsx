import { Post } from "@/features";

export default async function Page(props: {
  params: Promise<{ developerId: string }>;
}) {
  const params = await props.params;
  const developerId = params.developerId;

  return <Post developerId={developerId} />;
}
