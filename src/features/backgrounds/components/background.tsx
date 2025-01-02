import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";
import { Background as BackgroundType } from "../types";
import { errorHandler } from "@/lib";

type Props = { devId: string };

export async function Background({ devId: devId }: Props) {
  let background: BackgroundType | undefined;

  try {
    background = await backgroundsService.getBackgroundByDevId(devId);
  } catch (error) {
    errorHandler(error);
  }

  if (!background) {
    return (
      <Link href={`/developers/${devId}`}>
        <div className="space-y-2 max-w-96">
          <div className="flex justify-between items-start">
            <BackgroundSkeleton devId={devId} />
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/developers/${devId}`}>
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start">
          <BackgroundBasicInfo background={background} />
        </div>

        <div>
          <Row title="Languages" content={background.languages} />
          <Row title="Education" content={background.educations} />
          <SkillsBadges skills={background.skills} />
        </div>
      </div>
    </Link>
  );
}
