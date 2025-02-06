import { Row } from "./row";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";
import { BackgroundBasicInfoCard } from "./basic-info-card";

type Props = { developerProfileId: string };

export async function Background({ developerProfileId }: Props) {
  const background =
    await backgroundsService.getBackgroundByDeveloperProfileId(
      developerProfileId
    );

  if (!background) {
    return <BackgroundSkeleton developerProfileId={developerProfileId} />;
  }

  return (
    <Link href={`/developers/${developerProfileId}`}>
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start">
          <BackgroundBasicInfoCard
            background={background ?? undefined}
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
    </Link>
  );
}
