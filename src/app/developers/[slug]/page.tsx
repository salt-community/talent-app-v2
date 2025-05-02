import { Suspense } from "react";
import CVSkeleton from "./loading";
import CvWrapper from "@/features/developer-profiles/components/cv/cv-wrapper";
import { BlurFade } from "@/components/magicui/blur-fade";

type Params = {
  params: { slug: string };
};

export default function Page({ params }: Params) {
  const { slug } = params;
  
  return (
    <Suspense fallback={<CVSkeleton />}>
      <BlurFade delay={0.25} inView>
        <CvWrapperContainer slug={slug} />
      </BlurFade>
    </Suspense>
  );
}

async function CvWrapperContainer({ slug }: { slug: string }) {
  return <CvWrapper slug={slug} />;
}