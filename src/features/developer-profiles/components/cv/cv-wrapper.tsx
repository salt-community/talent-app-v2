import { iamService } from "@/features/iam";
import { developerProfilesService } from "../../instance";
import dynamic from "next/dynamic";

type CvWrapperProps = {
  slug: string;
};

const CvContainer = dynamic(
  () =>
    import("@/features/developer-profiles/components/cv/cv-container").then(
      (mod) => ({ default: mod.CvContainer })
    ),
  {
    loading: () => <div>Loading CV...</div>,
  }
);

export default async function CvWrapper({ slug }: CvWrapperProps) {
  const developerProfile =
    await developerProfilesService.getDeveloperBySlug(slug);

  if (!developerProfile) return;

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
