import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { CvInfo } from "../../types";
import { SocialLink } from "./social-link";

type Props = {
  developerProfile: CvInfo;
  hasProfileAccess: boolean;
};

export async function BackgroundBasicInfoCard({ developerProfile }: Props) {
  const filteredLinks = developerProfile.links.filter(
    (e) => e.name !== "LinkedIn"
  );
  return (
    <>
      <section className="flex justify-between w-full">
        <div className="flex gap-6 items-center justify-between">
          <BackgroundAvatar url={developerProfile.avatarUrl} size={"lg"} />
          <div>
            <p className="uppercase text-sm font-semibold">
              {developerProfile.title}
            </p>

            <H2>{developerProfile.name}</H2>
            <p className="font-light text-slate-600">{developerProfile.bio}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2 justify-end items-top h-full">
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
