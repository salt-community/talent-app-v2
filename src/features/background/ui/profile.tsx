import { Row } from "./row";
import { SocialLink } from "./social-link";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import SkillsInput from "./skills-input";

export async function Background() {
  const backgrounds = await backgroundsService.getAll();
  if (backgrounds.length === 0) {
    console.log("No backgrounds found");
    return null;
  }
  const background =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return (
    <div className="space-y-2 max-w-96">
      <BackgroundBasicInfo
        name={background.name}
        title={background.title}
        bio={background.bio}
        avatarURL={background.avatarUrl!}
      />
      <div>
        <Row title="Languages" content={background.languages} />
        <Row title="Education" content={background.educations} />
        <SkillsInput tags={background.skills}/>
        <ul className="flex gap-1 justify-end mt-2">
          {background.links &&
            background.links.map((link) => (
              <li key={link.url}>
                <SocialLink name={link.name} url={link.url} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
