import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import { SkillsBadges } from ".";
import Link from "next/link";

type Props = { devid?: string };
export async function Background({ devid }: Props) {
  const background = devid
    ? await backgroundsService.getBackgroundByDevId(devid)
    : (await backgroundsService.getAllBackgrounds())[0];
  if (!background) {
    return null;
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
