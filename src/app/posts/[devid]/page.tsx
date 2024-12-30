import { Post } from "@/features";

export default async function Page(props: {
  params: Promise<{ devid: string }>;
}) {
  const params = await props.params;
  const developerId = params.devid;

  return <Post developerId={developerId} />;
}
