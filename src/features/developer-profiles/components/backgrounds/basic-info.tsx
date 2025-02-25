import { H2 } from "@/components";
import { BackgroundAvatar } from "./avatar";
import { typeBackground } from "../../types";
type Props = { background: typeBackground };

export function BackgroundBasicInfo({ background }: Props) {
  return (
    <section className="flex justify-between w-full">
      <div className="flex gap-6 items-center justify-between">
        <BackgroundAvatar url={background.avatarUrl} />
        <div>
          <p className="uppercase text-sm font-semibold">{background.title}</p>

          <H2>{background.name}</H2>

          <p className="font-light text-slate-600">{background.bio}</p>
        </div>
      </div>
    </section>
  );
}
