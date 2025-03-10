type Props = {
  label: string;
  isEditable: boolean;
  onChange: (label: string) => void;
  onBlur: () => void;
};
export function EditableLabel({ label, isEditable, onChange, onBlur }: Props) {
  return (
    <div className="flex items-center gap-2">
      {isEditable ? (
        <input
          type="text"
          value={label}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="border border-gray-300 rounded px-2 py-1"
        />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
