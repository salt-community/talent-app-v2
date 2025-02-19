import { DeveloperCard } from "@/components/ui/developer-card";
import {
  BackgroundCard,
  developerProfilesService,
  Projects,
  projectsService,
  ScoreBoard,
} from "@/features";
import { notFound } from "next/navigation";

// Maximum timeout duration for the page speed API
export const maxDuration = 60;

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { slug } = await params;

  const developerProfiles = await projectsService.getAllDevelopers();
  const developerProfile = developerProfiles.find(
    (profile) => profile.slug === slug
  );
  if (!developerProfile) {
    return notFound();
  }

  return (
    <DeveloperCard>
      <BackgroundCard developerProfileId={developerProfile.id} />
      <ScoreBoard cohortId={"927d9e82-c0b1-4561-ac04-75883d7b01ae"} />
      {/* Hard coded cohortId? */}
      <Projects developerProfileId={developerProfile.id} />
    </DeveloperCard>
  );
}
