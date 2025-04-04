import { CvInfo } from "../../types";
import { InlineEditableCard } from "./inline-editable-card";
import { Row } from "./row";
import { SkillsBadges } from "./skills-badges";

type Props = { developerProfile: CvInfo };

export async function InlineBackgroundCard({ developerProfile }: Props) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-start w-full">
        <InlineEditableCard developerProfile={developerProfile} />
      </div>

      <div>
        <Row
          title="Languages"
          content={developerProfile.languages.map((language, index) => ({
            id: index,
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
