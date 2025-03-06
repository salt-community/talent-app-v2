import { BackgroundAvatar } from "../backgrounds/avatar";
import { EditCvHeader } from "./edit-cv-header";

type Props = {
  name: string;
  bio: string;
  avatarUrl: string;
  id: string;
  identityId: string;
  hasProfileAccess: boolean;
};
export function CvHeader({ name, bio, avatarUrl, id, identityId }: Props) {
  return (
    <>
      <article className="flex flex-col items-center md:items-start justify-center gap-4 md:gap-0 md:grid md:grid-cols-[1fr 2fr]">
        <div className="md:col-start-1 md:col-end-2 px-4 h-full md:bg-zinc-100">
          <BackgroundAvatar url={avatarUrl} size="lg" />
        </div>
        <div className="flex flex-col items-center gap-4 px-3 md:items-start md:col-start-2 md:col-end-3 md:pt-4">
         <div className="flex w-full justify-center md:justify-between gap-4 items-center pr-4">
          <h1 className="text-3xl font-bold capitalize">{name}</h1>
          <EditCvHeader
            avatarUrl={avatarUrl}
            name={name}
            bio={bio}
            id={id}
            identityId={identityId}
          />
         </div>
          <p className="font-light text-paragraph text-center md:text-left">
            {bio}
          </p>
        </div>
      </article>
    </>
  );
}
