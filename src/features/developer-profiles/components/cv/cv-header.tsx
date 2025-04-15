import { EditableField } from "./editable-field";
import { H2 } from "@/components";

type Props = {
  name: string;
  bio: string | null;
  id: string;
  identityId: string;
  hasProfileAccess: boolean;
  isEditable: boolean;
  onChange: ({ name, bio }: { name: string; bio: string | null }) => void;
};
export function CvHeader({ name, bio, isEditable, onChange }: Props) {
  return (
    <section className="flex flex-col items-center md:items-start justify-center gap-1 px-2">
      <H2 textColor="flex outline-none border border-transparent p-0 resize-none w-full text-4xl font-extrabold text-brand-orange">
        {name}
      </H2>
      <EditableField
        value={bio!}
        placeholder="Bio"
        fontSize="sm"
        isEditable={isEditable}
        onChange={(bio) => {
          onChange({ name, bio });
        }}
      />
    </section>
  );
}
