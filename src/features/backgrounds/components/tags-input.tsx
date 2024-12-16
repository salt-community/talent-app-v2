"use client";

import { Label } from "@/components/ui/label";
import { Tag, TagInput } from "emblor";
import { useState } from "react";

type Props = {
  tags: { id: number; name: string }[];
  inputName: string;
  inputPlaceholder: string;
  suggestedTags: { id: number; name: string }[];
};
export function TagsInput({
  tags,
  inputName,
  inputPlaceholder,
  suggestedTags,
}: Props) {
  const [exampleTags, setExampleTags] = useState<Tag[]>(
    tags.map((tag) => ({ id: String(tag.id), text: tag.name })),
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor={inputName} className="capitalize">
        {inputName}
      </Label>
      <TagInput
        id={inputName}
        tags={exampleTags}
        setTags={setExampleTags}
        placeholder={inputPlaceholder}
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "rounded-lg transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inputFieldPosition="top"
        enableAutocomplete
        addTagsOnBlur
        addOnPaste
        autocompleteOptions={suggestedTags.map((tag) => ({
          id: String(tag.id),
          text: tag.name,
        }))}
      />
      <input
        type="hidden"
        name={inputName}
        value={JSON.stringify(exampleTags)}
      />
    </div>
  );
}
