import { DeveloperCard } from "@/components/ui/developer-card";
import { Background } from "@/features/backgrounds/components";

export default function Page() {
  return (
    <>
      <DeveloperCard>
        <Background id={1} />
      </DeveloperCard>
    </>
  );
}
