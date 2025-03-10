import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
type Props = {
  label: string;
  isEditable: boolean;
  onChange: (label: string) => void;
};
export function EditableLabel({ label, isEditable, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 w-full px-10">
      {isEditable ? (
        <AutosizeTextarea
          value={label}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 resize-none"
          minHeight={24}
        />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
