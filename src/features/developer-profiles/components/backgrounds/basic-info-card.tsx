import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import {
  BackgroundInfo,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "../../types";
import { SocialLink } from "./social-link";
import { DialogForm } from "./dialog-form";
import { errorHandler } from "@/lib";
import { developerProfilesService } from "../../instance";

type Props = {
  developerProfile: BackgroundInfo;
  hasProfileAccess: boolean;
};

export async function BackgroundBasicInfoCard({
  developerProfile,
  hasProfileAccess,
}: Props) {
  let allSkills: SkillSelect[] = [];
  let allLanguages: LanguageSelect[] = [];
  let allEducations: EducationSelect[] = [];

  const filteredLinks = developerProfile.links.filter(
    (e) => e.name !== "LinkedIn"
  );

  try {
    allSkills = await developerProfilesService.getAllSkills();
    allLanguages = await developerProfilesService.getAllLanguages();
    allEducations = await developerProfilesService.getAllEducations();
  } catch (error) {
    errorHandler(error);
  }

  return (
    <>
      <section className="flex justify-between w-full">
        <div className="flex gap-6 items-center justify-between">
          <BackgroundAvatar url={developerProfile.avatarUrl} />
          <div>
            <p className="uppercase text-sm font-semibold">
              {developerProfile.title}
            </p>

            <H2>{developerProfile.name}</H2>
            <p className="font-light text-slate-600">{developerProfile.bio}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2 justify-end items-top h-full">
          {hasProfileAccess && (
            <DialogForm
              developerProfile={developerProfile}
              allSkills={allSkills}
              allLanguages={allLanguages}
              allEducations={allEducations}
            />
          )}
          {filteredLinks &&
            filteredLinks.map((link) => (
              <li key={link.name} className="h-full flex justify-start">
                <SocialLink name={link.name} url={link.url} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
