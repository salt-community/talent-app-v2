import { developerProfilesService } from "../../instance";
import { InlineEditableCard } from "./inline-editable-card";
import { Row } from "./row";
import { SkillsBadges } from "./skills-badges";

type Props = { developerProfileId: string };

export async function InlineBackgroundCard({ developerProfileId }: Props) {
  const developerProfile =
    await developerProfilesService.getDeveloperProfileById(developerProfileId);
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-start w-full">
        <InlineEditableCard developerProfile={developerProfile} />
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
