import { DeveloperProfileList } from "@/features/developer-profiles";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Suspense } from "react";
import Loading from "../loading";

export default function Page() {
  return (
    <div className="mx-auto md:px-0 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">Developer Profiles</h1>
      <BlurFade delay={0.25} inView>
        <Suspense fallback={<Loading />}>
          <DeveloperProfileList />
        </Suspense>
      </BlurFade>
    </div>
  );
}
    