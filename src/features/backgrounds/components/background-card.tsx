import { Row } from "./row";
import { backgroundsService } from "../instance";
import { BackgroundBasicInfoCard } from "./basic-info-card";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";

type Props = { devid: string };
export async function BackgroundCard({ devid }: Props) {
  const background = await backgroundsService.getBackgroundByDevId(devid);

  if (!background) {
    return (
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start w-full">
          <BackgroundSkeleton devId={devid} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-96">
      <div className="flex justify-between items-start w-full">
        <BackgroundBasicInfoCard background={background} devId={devid} />
      </div>

      <div>
        <Row title="Languages" content={background.languages} />
        <Row title="Education" content={background.educations} />
        <SkillsBadges skills={background.skills} />
      </div>
    </div>
  );
}
