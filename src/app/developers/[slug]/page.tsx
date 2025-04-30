import CvWrapper from "@/features/developer-profiles/components/cv/cv-wrapper";
import { Suspense } from "react";
import CVSkeleton from "./loading";
import { BlurFade } from "@/components/magicui/blur-fade";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;
 
  return (
    <Suspense fallback={<CVSkeleton />}>
      <BlurFade delay={0.25} inView>
        <CvWrapper slug={slug} />
      </BlurFade>
    </Suspense>
  );
}
