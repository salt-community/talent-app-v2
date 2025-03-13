import { Camera, Check } from "lucide-react";
import { BackgroundAvatar } from "../backgrounds/avatar";
import { EditableField } from "./editable-field";
import { Button } from "@/components";
import { CvPopover } from "./cv-popover";

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
        <div className="md:col-start-1 md:col-end-2 px-4 h-full md:bg-zinc-100 relative">
          <BackgroundAvatar url={avatarUrl} size="lg" />
          {isEditable && (
            <CvPopover
              placeholder={"Set your avatar URL"}
              icon={Check}
              onAdd={(avatarUrl) => {
                onChange({ name, bio, avatarUrl });
              }}
            >
              <Button className="absolute bottom-4 right-8 z-20 rounded-full p-0 h-8 w-8">
                <Camera />
              </Button>
            </CvPopover>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 px-3 md:items-start md:col-start-2 md:col-end-3 md:pt-4">
          <EditableField
            value={name}
            isEditable={isEditable}
            fontSize="lg"
            onChange={(name) => {
              onChange({ name, bio, avatarUrl });
            }}
          />
          <EditableField
            value={bio}
            fontSize="sm"
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
