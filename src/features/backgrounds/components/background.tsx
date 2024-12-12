import { Row } from "./row";
import { SocialLink } from "./social-link";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";

import { DialogForm } from "./dialog-form";
import { SkillsBadges } from ".";

export async function Background() {
  const background = (await backgroundsService.getById(1))[0];

  if (!background) {
    return null;
  }

  return (
    <div className="space-y-2 max-w-96">
      <div className="flex justify-between items-start">
        <BackgroundBasicInfo
          name={background.name}
          title={background.title}
          bio={background.bio}
          avatarURL={background.avatarUrl!}
        />
        <ul className="flex gap-1 justify-end items-top h-full">
          {background.links &&
            background.links.map((link) => (
              <li key={link.url} className="h-full flex justify-start">
                <SocialLink name={link.name} url={link.url} />
              </li>
            ))}
          <DialogForm background={background} />
        </ul>
      </div>

      <div>
        <Row title="Languages" content={background.languages} />
        <Row title="Education" content={background.educations} />
        <SkillsBadges skills={background.skills} />
      </div>
    </div>
  );
}
