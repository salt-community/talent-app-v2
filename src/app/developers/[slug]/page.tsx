import { DeveloperCard } from "@/components/ui/developer-card";
import {
  BackgroundCard,
  iamService,
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

  const hasProfileAccess = await iamService.hasProfileAccess(
    developerProfile.identityId
  );

  return (
    <DeveloperCard>
      <BackgroundCard
        developerProfileId={developerProfile.id}
        hasProfileAccess={hasProfileAccess}
      />
      {hasProfileAccess && (
        <ScoreBoard
          identityId={developerProfile.identityId}
          hasProfileAccess={hasProfileAccess}
        />
      )}{" "}
      <Projects
        developerProfileId={developerProfile.id}
        hasProfileAccess={hasProfileAccess}
      />
    </DeveloperCard>
  );
}
