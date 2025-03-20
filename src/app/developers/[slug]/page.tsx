import { developerProfilesService } from "@/features/developer-profiles";
import { CV } from "@/features/developer-profiles/components/cv/cv";
import { iamService } from "@/features/iam";

import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { slug } = await params;

  const developerProfiles = await developerProfilesService.getAll();
  const developerProfile = developerProfiles.find(
    (profile) => profile.slug === slug,
  );

  if (!developerProfile) return notFound();

  const hasProfileAccess = await iamService.hasProfileAccess(
    developerProfile.identityId,
  );

  return (
    <CV
      developerProfileId={developerProfile.id}
      hasProfileAccess={hasProfileAccess}
    />
  );
}
