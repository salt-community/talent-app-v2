import { EditableField } from "./editable-field";

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
      <EditableField
        value={name}
        placeholder="Name"
        isEditable={isEditable}
        fontSize="lg"
        onChange={(name) => {
          onChange({ name, bio });
        }}
      />
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
