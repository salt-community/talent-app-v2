import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { Background } from "../types";
import { SocialLink } from "./social-link";
import { DialogForm } from "./dialog-form";
import { backgroundsService } from "../instance";

type Props = { background: Background; devId: string };

export async function BackgroundBasicInfoCard({ background }: Props) {
  const isFeatureBioEnabled = process.env.NEXT_PUBLIC_FEATURE_BIO === "ON";

  const allSkills = await backgroundsService.getAllSkills();
  const allLanguages = await backgroundsService.getAllLanguages();
  const allEducations = await backgroundsService.getAllEducations();
  const filteredLinks = background.links.filter((e) => e.name !== "LinkedIn");

  const editAccess = await backgroundsService.editAccess();
  console.log(editAccess);
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
            {isFeatureBioEnabled && (
              <p className="font-light text-slate-600">{background.bio}</p>
            )}
          </div>
        </div>
        <ul className="flex flex-col gap-2 justify-end items-top h-full">
          {editAccess && (
            <DialogForm
              background={background}
              allSkills={allSkills}
              allLanguages={allLanguages}
              allEducations={allEducations}
            />
          )}
          {filteredLinks &&
            filteredLinks.map((link) => (
              <li key={link.url} className="h-full flex justify-start">
                <SocialLink name={link.name} url={link.url} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
