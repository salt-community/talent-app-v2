import { H2 } from "@/components";
import { BackgroundAvatar } from "../backgrounds/avatar";

type Props = {
   name: string;
   introduction: string;
   avatarUrl: string;
   hasProfileAccess: boolean;
 };
export function CvHeader({ name, introduction, avatarUrl } : Props) {
  return (
    <article>
      <BackgroundAvatar url={avatarUrl} />
      <div>
        <H2>{name}</H2>
        <p className="font-light text-slate-600">{introduction}</p>
      </div>
    </article>
  );
}
