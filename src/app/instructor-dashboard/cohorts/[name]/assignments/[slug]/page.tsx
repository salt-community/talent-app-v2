import { Assignment } from "@/features/instructors-dashboard";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  return (
    <div>
      <Assignment slug={slug} />
    </div>
  );
}
