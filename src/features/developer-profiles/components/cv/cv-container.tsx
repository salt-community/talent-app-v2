import { developerProfilesService } from "../../instance";
import { CvHeader } from "./cv-header";

type Props = {
  developerProfileId: string;
  hasProfileAccess: boolean;
};

export async function CvContainer({
  developerProfileId,
  hasProfileAccess,
}: Props) {
  const background =
    await developerProfilesService.getDeveloperProfileById(developerProfileId);

  return (
    <section className="border-red-800 border-2 py-6 md:py-0 md:mx-auto md:min-h-[1122px] md:max-h-[1122px]  md:min-w-[795px] md:max-w-[795px]">
      <div className="hidden md:block text-end py-3 pr-4 bg-zinc-100 font-bold">
        {"</salt>"}
      </div>
      <CvHeader
        name={background.name}
        introduction={background.bio}
        avatarUrl={background.avatarUrl}
        hasProfileAccess={hasProfileAccess}
      />
    </section>
  );
}
