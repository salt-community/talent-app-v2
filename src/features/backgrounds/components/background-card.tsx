import { Row } from "./row";
import { backgroundsService } from "../instance";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";
import { BackgroundBasicInfoCard } from "./basic-info-card";
import { notFound } from "next/navigation";

type Props = { developerProfileId: string };

export async function BackgroundCard({ developerProfileId }: Props) {
  const background =
    await backgroundsService.getBackgroundByDeveloperProfileId(
      developerProfileId
    );

  if (!background) {
    return <BackgroundSkeleton developerProfileId={developerProfileId} />;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start w-full">
        <BackgroundBasicInfoCard
          background={background}
          developerProfileId={developerProfileId}
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
