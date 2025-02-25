import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import { SkillsBadges } from "./skills-badges";

type Props = { developerProfileId: string; page: string };

export async function Background({ developerProfileId, page }: Props) {
  const background =
    await backgroundsService.getBackgroundByDeveloperProfileId(
      developerProfileId
    );

  if (page === "highlight") {
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
