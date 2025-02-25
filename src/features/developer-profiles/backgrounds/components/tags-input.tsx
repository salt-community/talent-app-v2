"use client";

import { Label } from "@/components/";
import { Tag, TagInput } from "emblor";
import { useState } from "react";

type Props = {
  userTags: { id: number; name: string }[];
  inputName: string;
  inputPlaceholder: string;
  suggestedTags: { id: number; name: string }[];
};
export function TagsInput({
  userTags,
  inputName,
  inputPlaceholder,
  suggestedTags,
}: Props) {
  const [tags, setTags] = useState<Tag[]>(
    userTags.map((tag) => ({ id: String(tag.id), text: tag.name }))
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const autocompleteOptions = suggestedTags
    .map((tag) => ({
      id: String(tag.id),
      text: tag.name,
    }))
    .filter((tag) => !tags.some((t) => t.text === tag.text));

  return (
    <div className="space-y-2">
      <Label htmlFor={inputName} className="capitalize">
        {inputName}
      </Label>
      <TagInput
        id={inputName}
        tags={tags}
        setTags={setTags}
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
              "z-10 absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
          autoComplete: {
            commandGroup: "flex flex-wrap gap-1 max-h-[500px] overflow-y-auto",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inputFieldPosition="top"
        enableAutocomplete
        autoCapitalize="words"
        autocompleteOptions={autocompleteOptions}
      />
      <input type="hidden" name={inputName} value={JSON.stringify(tags)} />
    </div>
  );
}
