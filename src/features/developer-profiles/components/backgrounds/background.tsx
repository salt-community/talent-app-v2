import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { SkillsBadges } from "./skills-badges";
import { CvInfo } from "../../types";

type Props = { developerProfile: CvInfo };

export function Background({ developerProfile }: Props) {
  return (
    <div className="space-y-2 max-w-96">
      <div className="flex justify-between items-start">
        <BackgroundBasicInfo developerProfile={developerProfile} />
      </div>

      <div>
        <Row
          title="Languages"
          content={developerProfile.languages.map((language, index) => ({ id: index, name: language.name }))}
        />
        <Row
          title="Education"
          content={developerProfile.educations.map((education, index) => ({ id: index, name: education.role }))}
        />
        <SkillsBadges skills={developerProfile.skills} />
      </div>
    </div>
  );
}
