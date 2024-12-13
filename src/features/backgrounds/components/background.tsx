import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import { SkillsBadges } from ".";

type Props = { uuid?: string };
export async function Background({ uuid }: Props) {
  const background = uuid
    ? (await backgroundsService.getByUUID(uuid))[0]
    : (await backgroundsService.getAll())[0];

  if (!background) {
    return null;
  }

  return (
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
  );
}
