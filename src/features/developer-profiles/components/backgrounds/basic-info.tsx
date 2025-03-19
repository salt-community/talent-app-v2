import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { DeveloperProfile } from "../../types";
type Props = { developerProfile: DeveloperProfile };

export function BackgroundBasicInfo({ developerProfile }: Props) {
  return (
    <section className="flex justify-between w-full">
      <div className="flex gap-6 items-center justify-between">
        <BackgroundAvatar url={developerProfile.avatarUrl} />
        <div>
          <p className="uppercase text-sm font-semibold">
            {developerProfile.title}
          </p>

          <H2>{developerProfile.name}</H2>

          <p className="font-light text-slate-600">{developerProfile.headline}</p>
        </div>
      </div>
    </section>
  );
}
