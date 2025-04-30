import { HighlightedDevelopers } from "@/features/developer-profiles";
import { Suspense } from "react";
import SkeletonCard from "./loading";

export default function Page() {
  return (
    <div>
      <h2 className="text-center text-5xl font-extrabold pt-16 text-header px-1">
        Our Developers in Focus
      </h2>
      <h3 className="text-center text-lg pt-6 text-paragraphLight px-6">
        Each developer has a unique story, skill set, and impact on the tech
        world. Meet a standout talent and explore their journey.
      </h3>
      <Suspense fallback={<SkeletonCard />}>
      <HighlightedDevelopers />
      </Suspense>
    </div>

  );
}
