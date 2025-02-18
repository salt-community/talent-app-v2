import { Row } from "./row";
import { BackgroundBasicInfo } from "./basic-info";
import { backgroundsService } from "../instance";
import Link from "next/link";
import { SkillsBadges } from "./skills-badges";
import BackgroundSkeleton from "./background-skeleton";

type Props = { developerProfileId: string; page: string };

export async function Background({ developerProfileId, page }: Props) {
  const background =
    await backgroundsService.getBackgroundByDeveloperProfileId(
      developerProfileId
    );
  const developerProfiles = await backgroundsService.getAllDeveloperProfile();

  const developerSlug = developerProfiles.find(
    (profile) => profile.id === developerProfileId
  );

  if (!background) {
    return <BackgroundSkeleton developerProfileId={developerProfileId} />;
  } else if (page === "highlight") {
    return (
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start">
          <BackgroundBasicInfo background={background ?? undefined} />
        </div>

        <div>
          <Row
            title="Languages"
            content={background.languages.map((language) => ({
              id: language.id,
              name: language.name,
            }))}
          />
          <Row
            title="Education"
            content={background.educations.map((education) => ({
              id: education.id,
              name: education.name,
            }))}
          />
          <SkillsBadges skills={background.skills} />
        </div>
      </div>
    );
  }

  return (
    <Link href={`/developers/${developerSlug?.slug}`}>
      <div className="space-y-2 max-w-96">
        <div className="flex justify-between items-start">
          <BackgroundBasicInfo background={background ?? undefined} />
        </div>

        <div>
          <Row
            title="Languages"
            content={background.languages.map((language) => ({
              id: language.id,
              name: language.name,
            }))}
          />
          <Row
            title="Education"
            content={background.educations.map((education) => ({
              id: education.id,
              name: education.name,
            }))}
          />
          <SkillsBadges skills={background.skills} />
        </div>
      </div>
    </Link>
  );
}
