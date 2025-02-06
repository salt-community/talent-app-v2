import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";

type Props = { developerProfileId: string };

export async function Background({ developerProfileId }: Props) {
  const background =
    await backgroundsService.getBackgroundByDevId(developerProfileId);

  if (background === undefined || background.length === 0) {
    return <BackgroundSkeleton developerProfileId={developerProfileId} />;
  }

  return (
    <Link href={`/developers/${developerProfileId}`}>
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start">
          <BackgroundBasicInfo background={background[0].backgrounds} />
        </div>

        <div>
          <Row
            title="Languages"
            content={background
              .map((b) => b.background_languages)
              .filter(
                (
                  lang
                ): lang is {
                  id: number;
                  name: string;
                  backgroundId: number;
                  level: number;
                } => lang !== null
              )
              .map(({ id, name }) => ({ id, name }))}
          />
          <Row
            title="Education"
            content={background
              .map((b) => b.background_educations)
              .filter(
                (
                  education
                ): education is {
                  id: number;
                  name: string;
                  backgroundId: number;
                  level: number;
                } => education !== null
              )
              .map(({ id, name }) => ({ id, name }))}
          />
          <SkillsBadges
            skills={background
              .map((s) => s.background_skills)
              .filter((skill) => skill !== null)}
          />
        </div>
      </div>
    </Link>
  );
}
