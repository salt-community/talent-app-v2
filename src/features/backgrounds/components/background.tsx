import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
type Props = { devid: string };
export async function Background({ devid }: Props) {
  const background = await backgroundsService.getBackgroundByDevId(devid);
  const slug = await backgroundsService.getSlugById(devid);


  if (!background) return null;

  return (
    <Link href={`/developers/${slug}`}>
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
