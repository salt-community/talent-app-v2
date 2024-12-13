import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { Background } from "../types";

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
            <ul className="flex gap-1 justify-end items-top h-full"></ul>
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
