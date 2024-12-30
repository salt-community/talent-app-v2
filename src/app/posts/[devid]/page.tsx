import { Post } from "@/features";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const developerId = params.id;

  console.log(developerId)
  

  return (
   <Post developerId={developerId}/>
  )}
