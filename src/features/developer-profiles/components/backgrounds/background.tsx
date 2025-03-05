import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { SkillsBadges } from "./skills-badges";
import { developerProfilesService } from "../../instance";

type Props = { developerProfileId: string };

export async function Background({ developerProfileId }: Props) {
  const background =
    await developerProfilesService.getDeveloperProfileById(developerProfileId);

  return (
    <div className="space-y-2 max-w-96">
      <div className="flex justify-between items-start">
        <BackgroundBasicInfo background={background} />
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
