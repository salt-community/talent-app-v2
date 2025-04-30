import CvWrapper from "@/features/developer-profiles/components/cv/cv-wrapper";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  return <CvWrapper slug={slug} />;
}
