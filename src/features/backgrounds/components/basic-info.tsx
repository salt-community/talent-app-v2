import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { Background } from "../types";
import { SocialLink } from "./social-link";
import { DialogForm } from "./dialog-form";
type Props = { background: Background };

export function BackgroundBasicInfo({ background }: Props) {
  const isFeatureBioEnabled = process.env.NEXT_PUBLIC_FEATURE_BIO === "ON";
  return (
    <>
      <section className="flex justify-between">
        <div className="flex gap-6 items-center">
          <BackgroundAvatar url={background.avatarUrl} />
          <div>
            <p className="uppercase text-sm font-semibold">
              {background.title}
            </p>
            <ul className="flex gap-1 justify-end items-top h-full">
              {background.links &&
                background.links.map((link) => (
                  <li key={link.url} className="h-full flex justify-start">
                    <SocialLink name={link.name} url={link.url} />
                  </li>
                ))}
              <DialogForm background={background} />
            </ul>
            <H2>{background.name}</H2>
            {isFeatureBioEnabled && (
              <p className="font-light text-slate-600">{background.bio}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
