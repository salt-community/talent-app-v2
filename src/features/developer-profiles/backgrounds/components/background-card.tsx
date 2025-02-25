import { Row } from "./row";
import { SkillsBadges } from "./skills-badges";
import { BackgroundBasicInfoCard } from "./basic-info-card";
import { backgroundsService } from "../../instance";

type Props = { developerProfileId: string; hasProfileAccess: boolean };

export async function BackgroundCard({
  developerProfileId,
  hasProfileAccess,
}: Props) {
  const background =
    await backgroundsService.getBackgroundByDeveloperProfileId(
      developerProfileId
    );

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start w-full">
        <BackgroundBasicInfoCard
          background={background}
          developerProfileId={developerProfileId}
          hasProfileAccess={hasProfileAccess}
        />
      </div>

      <div>
        <Row
          title="Languages"
          content={background.languages.map((language) => ({
            id: language.id,
            name: language.name,
          }))}
        />
        <Row
          title="Education"
          content={background.educations.map((education) => ({
            id: education.id,
            name: education.name,
          }))}
        />
        <SkillsBadges skills={background.skills} />
      </div>
    </div>
  );
}
