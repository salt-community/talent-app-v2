import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import React, { useState } from "react";

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
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`w-full p-2 border rounded-md border-gray-500 ${
        isEditable ? `${focus ? "ring" : ""}` : "border-transparent"
      }`}
    >
      {isEditable ? (
        <AutosizeTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="border border-transparent p-0 resize-none leading-none w-full"
          style={textStyle}
          minHeight={0}
        />
      ) : (
        <div
          style={textStyle}
          className="whitespace-pre-wrap p-0 border border-transparent leading-none w-full"
        >
          {value}
        </div>
      )}
    </div>
  );
}
