import { notFound } from "next/navigation";
import { iamService } from "@/features/iam";
import { developerProfilesService } from "../../instance";
import { CvContainer } from "./cv-container";

type CvWrapperProps = {
  slug: string;
};

export default async function CvWrapper({ slug }: CvWrapperProps) {
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
