import { DeveloperCard } from "@/components/ui/developer-card";
import { ScoreBoard } from "@/features/assignments";
import { BackgroundCard } from "@/features/backgrounds";
import { developerProfilesService } from "@/features/developer-profiles";
import { iamService } from "@/features/iam";
import { Projects } from "@/features/projects";
import { notFound } from "next/navigation";

// Maximum timeout duration for the page speed API
export const maxDuration = 60;

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { slug } = await params;

  const developerProfiles = await developerProfilesService.getAll();
  const developerProfile = developerProfiles.find(
    (profile) => profile.slug === slug
  );
  if (!developerProfile) {
    return notFound();
  }

  const hasProfileAccess = await iamService.hasProfileAccess(
    developerProfile.identityId
  );
  const hasUserAccess =
    await iamService.hasCurrentUserAccess("assignment.score");

  return (
    <DeveloperCard>
      <BackgroundCard
        developerProfileId={developerProfile.id}
        hasProfileAccess={hasProfileAccess}
      />
      {(hasProfileAccess || hasUserAccess) && (
        <ScoreBoard identityId={developerProfile.identityId} />
      )}
      <Projects
        developerProfileId={developerProfile.id}
        hasProfileAccess={hasProfileAccess}
      />
    </DeveloperCard>
  );
}
