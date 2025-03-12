import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  value: string;
  isEditable: boolean;
  fontSize?: "sm" | "md" | "lg";
  onChange: (value: string) => void;
};

export function EditableField({
  value,
  isEditable,
  fontSize = "sm",
  onChange,
}: Props) {
  const [focus, setFocus] = useState(false);
  const textSize = fontSize === "sm" ? 16 : fontSize === "md" ? 24 : 36;
  const textClass =
    fontSize === "sm"
      ? "text-base text-paragraph-light"
      : fontSize === "md"
        ? "text-xl font-bold text-paragraph-light"
        : "text-4xl font-extrabold";

  return (
    <>
      {isEditable ? (
        <div
          className={cn(
            "w-full p-1 border rounded-md border-gray-500",
            focus && "ring"
          )}
        >
          <AutosizeTextarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={cn(
              "border border-transparent p-0 resize-none leading-none w-full ",
              textClass
            )}
            minHeight={textSize + 10}
          />
        </div>
      ) : (
        <div className="whitespace-pre-wrap w-full border rounded-md p-1 border-transparent text">
          <p
            style={{ minHeight: textSize + 10 }}
            className={cn(
              "flex outline-none text-sm border border-transparent p-0 resize-none leading-none w-full",
              textClass
            )}
          >
            {value}
          </p>
        </div>
      )}
    </>
  );
}
