import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { Background } from "../types";
type Props = { background: Background };

export function BackgroundBasicInfo({ background }: Props) {
  const isFeatureBioEnabled = process.env.NEXT_PUBLIC_FEATURE_BIO === "ON";
  return (
    <>
      <section className="flex gap-3 justify-between w-full">
        <Link href={`/developers/${devId}`}>
          <div className="flex gap-6 justify-between">
            <BackgroundAvatar url={background.avatarUrl} />
            <div className="flex flex-col gap-1">
              <p className="uppercase text-sm font-semibold">
                {background.title}
              </p>

              <H2>{background.name}</H2>
              {isFeatureBioEnabled && (
                <p className="font-light text-sm text-slate-600">
                  {background.bio}
                </p>
              )}
            </div>
          </div>
        </Link>
        <ul className="flex flex-col gap-2 items-center justify-end items-top h-full">
        <DialogForm background={background} />
          {background.links &&
            background.links.map((link) => (
              <li key={link.url} className="h-full flex justify-start">
                <SocialLink name={link.name} url={link.url} size={23} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
