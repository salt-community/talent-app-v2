import { DeveloperProfileList } from "@/features/developer-profiles";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Page() {
  return (
    <BlurFade delay={0.25} inView>
      <DeveloperProfileList />
    </BlurFade>
  );
}
