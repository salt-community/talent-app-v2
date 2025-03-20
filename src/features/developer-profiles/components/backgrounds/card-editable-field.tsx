import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  value: string;
  placeholder?: string;
  isEditable: boolean;
  textStyle?: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export function CardEditableField({
  value,
  placeholder,
  isEditable,
  textStyle,
  onChange,
  onKeyDown,
}: Props) {
  return (
    <AutosizeTextarea
      minHeight={16}
      value={value}
      placeholder={placeholder}
      readOnly={!isEditable}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        event.preventDefault();
      }}
      className={cn(
        "w-full rounded-md px-1 py-0 focus-visible:outline-none resize-none overflow-hidden",
        textStyle,
        isEditable
          ? "border border-zinc-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          : "border border-transparent cursor-pointer bg-transparent"
      )}
    />
  );
}
