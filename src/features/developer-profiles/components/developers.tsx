import { BlurFade } from "@/components/magicui/blur-fade";
import { DeveloperCard } from "./developer-card";

type Props = {
  developerProfileIds: string[];
};

export function Developers({ developerProfileIds }: Props) {
  return (
    <BlurFade delay={0.25} inView>
      <ul className="pt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {developerProfileIds.map((developerProfileId, index) => (
          <DeveloperCard key={index} developerProfileId={developerProfileId} />
        ))}
      </ul>
    </BlurFade>
  );
}
