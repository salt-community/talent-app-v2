
import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";

type Props = { name: string; title: string; bio: string; avatarURL: string };

export function BackgroundBasicInfo({ name, title, bio, avatarURL }: Props) {
  const isFeatureBioEnabled = process.env.NEXT_PUBLIC_FEATURE_BIO === "ON";
  return (
    <>
      <section className="flex justify-between">
        <div className="flex gap-6 items-center">
          <BackgroundAvatar url={avatarURL} />
          <div>
            <p className="uppercase text-sm font-semibold">{title}</p>
            <H2>{name}</H2>
            {isFeatureBioEnabled && (
              <p className="font-light text-slate-600">{bio}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
