import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import React from "react";

type Props = {
  value: string;
  isEditable: boolean;
  onChange: (value: string) => void;
  fontSize?: number;
};

export function EditableField({
  value,
  isEditable,
  onChange,
  fontSize = 16,
}: Props) {
  const textStyle = { fontSize: `${fontSize}px` };

  return (
    <div className="flex items-center gap-2 w-full px-10" style={textStyle}>
      {isEditable ? (
        <AutosizeTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 resize-none"
          style={textStyle}
          minHeight={fontSize}
        />
      ) : (
        <div style={textStyle}>{value}</div>
      )}
    </div>
  );
}
