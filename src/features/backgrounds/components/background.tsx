import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";
type Props = { devid: string };
export async function Background({ devid }: Props) {
  const background = await backgroundsService.getBackgroundByDevId(devid);

  if (!background) {
    return (
      <Link href={`/developers/${devid}`}>
        <div className="space-y-2 max-w-96">
          <div className="flex justify-between items-start">
            <BackgroundSkeleton devId={devid} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/developers/${devid}`}>
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
