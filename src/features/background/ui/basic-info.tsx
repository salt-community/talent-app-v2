import { H1 } from "@/components/ui/header/header-h1";
import { BackgroundAvatar } from "./avatar";
import { EditInfoForm } from "./form-info";


type Props = { name: string; title: string; bio: string; avatarURL: string };

export function BackgroundBasicInfo({ name, title, bio, avatarURL }: Props) {
  const isFeatureBioEnabled = process.env.NEXT_PUBLIC_FEATURE_BIO === "ON";
  return (
    <>
      <section className="flex justify-between">
        <div className="flex gap-6">
          <BackgroundAvatar url={avatarURL} />
          <div>
            <p className="uppercase text-sm font-semibold">{title}</p>
            <H1>{name}</H1>
            {isFeatureBioEnabled && (
              <p className="font-light text-slate-600">{bio}</p>
            )}
          </div>
        </div>

        <EditInfoForm />
      </section>
    </>
  );
}
