import {
  CvContainer,
  developerProfilesService,
} from "@/features/developer-profiles";
import { iamService } from "@/features/iam";

import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function DeveloperDetailPage({ params }: Params) {
  const { slug } = await params;

  const developerProfile =
    await developerProfilesService.getDeveloperBySlug(slug);

  if (!developerProfile) return notFound();

  const hasProfileAccess = await iamService.hasProfileAccess(
    developerProfile.identityId
  );

  return (
    <CvContainer
      defaultCvInfo={developerProfile}
      hasProfileAccess={hasProfileAccess}
    />
  );
}
