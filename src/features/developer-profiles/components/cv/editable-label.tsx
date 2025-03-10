import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import React from "react";

type Props = {
  label: string;
  isEditable: boolean;
  onChange: (label: string) => void;
  fontSize?: number;
};

export function EditableLabel({
  label,
  isEditable,
  onChange,
  fontSize = 16,
}: Props) {
  const textStyle = { fontSize: `${fontSize}px` };

  return (
    <div className="flex items-center gap-2 w-full px-10" style={textStyle}>
      {isEditable ? (
        <AutosizeTextarea
          value={label}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 resize-none"
          style={textStyle}
          minHeight={fontSize}
        />
      ) : (
        <div style={textStyle}>{label}</div>
      )}
    </div>
  );
}
