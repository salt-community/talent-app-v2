import { AssignmentComponent } from "@/features/instructors-dashboard";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  console.log({ slug: slug });

  return (
    <div>
      <AssignmentComponent slug={slug} />
    </div>
  );
}
