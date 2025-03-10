import { BackgroundAvatar } from "../backgrounds/avatar";
import { EditableField } from "./editable-field";

type Props = {
  name: string;
  bio: string;
  avatarUrl: string;
  id: string;
  identityId: string;
  hasProfileAccess: boolean;
  isEditable: boolean;
  onChange: ({
    name,
    bio,
    avatarUrl,
  }: {
    name: string;
    bio: string;
    avatarUrl: string;
  }) => void;
};
export function CvHeader({
  name,
  bio,
  avatarUrl,
  isEditable,
  onChange,
}: Props) {
  return (
    <>
      <article className="flex flex-col items-center md:items-start justify-center gap-4 md:gap-0 md:grid md:grid-cols-[15rem_2fr] pb-8 md:pb-0">
        <div className="md:col-start-1 md:col-end-2 px-4 h-full md:bg-zinc-100">
          <BackgroundAvatar url={avatarUrl} size="lg" />
        </div>
        <div className="flex flex-col items-center gap-4 px-3 md:items-start md:col-start-2 md:col-end-3 md:pt-4">
          <div className="flex w-full justify-center md:justify-between gap-4 items-center pr-4">
            <EditableField
              value={name}
              isEditable={isEditable}
              onChange={(name) => {
                onChange({ name, bio, avatarUrl });
              }}
            />
          </div>
          <EditableField
            value={bio}
            isEditable={isEditable}
            onChange={(bio) => {
              onChange({ name, bio, avatarUrl });
            }}
          />
        </div>
      </article>
    </>
  );
}
