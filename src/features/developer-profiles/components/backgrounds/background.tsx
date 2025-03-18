import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { SkillsBadges } from "./skills-badges";
import { developerProfilesService } from "../../instance";

type Props = { developerProfileId: string };

export async function Background({ developerProfileId }: Props) {
  const developerProfile =
    await developerProfilesService.getDeveloperProfileById(developerProfileId);

  return (
    <div className="space-y-2 max-w-96">
      <div className="flex justify-between items-start">
        <BackgroundBasicInfo developerProfile={developerProfile} />
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
