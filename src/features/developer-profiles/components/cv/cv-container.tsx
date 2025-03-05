import { developerProfilesService } from "../../instance";
import { CvHeader } from "./cv-header";

type Props = {
  developerProfileId: string;
  hasProfileAccess: boolean;
};

export async function CvContainer({
  developerProfileId,
  hasProfileAccess,
}: Props) {
  const background =
    await developerProfilesService.getBackgroundByDeveloperProfileId(
      developerProfileId
    );

  return (
    <section className="border-red-800 border-2 py-8">
      <CvHeader
        name={background.name}
        introduction={background.bio}
        avatarUrl={background.avatarUrl}
        hasProfileAccess={hasProfileAccess}
      />
    </section>
  );
}