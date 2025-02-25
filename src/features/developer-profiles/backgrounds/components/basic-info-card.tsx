import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import {
  BackgroundInfo,
  EducationSelect,
  LanguageSelect,
  SkillSelect,
} from "../types";
import { SocialLink } from "./social-link";
import { DialogForm } from "./dialog-form";
import { backgroundsService } from "../../instance";
import { errorHandler } from "@/lib";

type Props = {
  background: BackgroundInfo;
  developerProfileId: string;
  hasProfileAccess: boolean;
};

export async function BackgroundBasicInfoCard({
  background,
  hasProfileAccess,
}: Props) {
  let allSkills: SkillSelect[] = [];
  let allLanguages: LanguageSelect[] = [];
  let allEducations: EducationSelect[] = [];

  const filteredLinks = background.links.filter((e) => e.name !== "LinkedIn");

  try {
    allSkills = await backgroundsService.getAllSkills();
    allLanguages = await backgroundsService.getAllLanguages();
    allEducations = await backgroundsService.getAllEducations();
  } catch (error) {
    errorHandler(error);
  }

  return (
    <>
      <section className="flex justify-between w-full">
        <div className="flex gap-6 items-center justify-between">
          <BackgroundAvatar url={background.avatarUrl} />
          <div>
            <p className="uppercase text-sm font-semibold">
              {background.title}
            </p>

            <H2>{background.name}</H2>
            <p className="font-light text-slate-600">{background.bio}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2 justify-end items-top h-full">
          {hasProfileAccess && (
            <DialogForm
              background={background}
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
