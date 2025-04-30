import CvWrapper from "@/features/developer-profiles/components/cv/cv-wrapper";
import { Suspense } from "react";
import CVSkeleton from "./loading";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return (
    <Suspense fallback={<CVSkeleton />}>
      <CvWrapper slug={slug} />
    </Suspense>
  );
}
