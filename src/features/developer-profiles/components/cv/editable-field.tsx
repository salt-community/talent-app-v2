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
    <div className="flex items-center w-full" style={textStyle}>
      {isEditable ? (
        <AutosizeTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded py-2 resize-none leading-none w-full h-full"
          style={textStyle}
          minHeight={fontSize}
        />
      ) : (
        <div
          style={textStyle}
          className="whitespace-pre-wrap border rounded py-2 border-transparent leading-none w-full h-full"
        >
          {value}
        </div>
      )}
    </div>
  );
}
