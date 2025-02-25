import { AssignmentComponent } from "@/features/instructors-dashboard";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  return (
    <div>
      <AssignmentComponent slug={slug} />
    </div>
  );
}
