import { Row } from "./row";
import { SkillsBadges } from "./skills-badges";
import { BackgroundBasicInfoCard } from "./basic-info-card";
import { developerProfilesService } from "../../instance";

type Props = { developerProfileId: string; hasProfileAccess: boolean };

export async function BackgroundCard({
  developerProfileId,
  hasProfileAccess,
}: Props) {
  const developerProfile =
    await developerProfilesService.getDeveloperProfileById(developerProfileId);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start w-full">
        <BackgroundBasicInfoCard
          developerProfile={developerProfile}
          hasProfileAccess={hasProfileAccess}
        />
      </div>   

      <div>
        <Row
          title="Languages"
          content={developerProfile.languages.map((language) => ({
            id: language.id,
            name: language.name,
          }))}
        />
        <Row
          title="Education"
          content={developerProfile.educations.map((education, index) => ({
            id: index,
            name: education.role,
          }))}
        />
        <SkillsBadges skills={developerProfile.skills} />
      </div>
    </div>
  );
}
