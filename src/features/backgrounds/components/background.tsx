import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";

type Props = { devId: string };

export async function Background({ devId: devId }: Props) {
  const background = await backgroundsService.getBackgroundByDevId(devId);
  console.log({ background: background });

  if (background === undefined || background.length === 0) {
    return <BackgroundSkeleton devId={devId} />;
  }

  return (
    <Link href={`/developers/${devId}`}>
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start">
          <BackgroundBasicInfo
            background={background[0].backgrounds ?? undefined}
          />
        </div>

        <div>
          <Row
            title="Languages"
            content={background.map((b) => b.background_languages)}
          />
          <Row
            title="Education"
            content={background.map((l) => l.background_languages)}
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
