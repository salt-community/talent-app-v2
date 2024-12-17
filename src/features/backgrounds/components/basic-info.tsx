import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { Background } from "../types";
import { SocialLink } from "./social-link";
import { DialogForm } from "./dialog-form";
import Link from "next/link";
type Props = { background: Background };

export function BackgroundBasicInfo({ background }: Props) {
  const isFeatureBioEnabled = process.env.NEXT_PUBLIC_FEATURE_BIO === "ON";
  const devId = background.devId;
  return (
    <>
      <section className="flex justify-between w-full">
        <Link href={`/developers/${devId}`}>
          <div className="flex gap-6 justify-between">
            <BackgroundAvatar url={background.avatarUrl} />
            <div>
              <p className="uppercase text-sm font-semibold">
                {background.title}
              </p>

              <H2>{background.name}</H2>
              {isFeatureBioEnabled && (
                <p className="font-light text-sm text-slate-600">{background.bio}</p>
              )}
            </div>
          </div>
        </Link>
        <ul className="flex flex-col gap-1 items-center justify-end items-top h-full">
        <DialogForm background={background} />
          {background.links &&
            background.links.map((link) => (
              <li key={link.url} className="h-full flex justify-start">
                <SocialLink name={link.name} url={link.url} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}