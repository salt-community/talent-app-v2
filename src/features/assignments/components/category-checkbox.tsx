import { capitalizeFirstLetter, toCamelCase } from "@/lib/utils";
import React from "react";
import type { CategoryTag } from "../categories";

type Props = {
  tag: CategoryTag;
  checked?: boolean;
  handleChangeTag?: (isChecked: boolean, tag: CategoryTag) => void;
};

export function CategoryCheckbox({ tag, checked, handleChangeTag }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={toCamelCase(tag)}
        value={toCamelCase(tag)}
        id={toCamelCase(tag)}
        className="focus:ring-3 focus:ring-gray-200"
        onChange={(e) => {
          if (handleChangeTag) handleChangeTag(e.target.checked, tag);
        }}
        {...(checked !== undefined ? { checked: checked } : {})}
      />
      <label
        htmlFor={toCamelCase(tag)}
        className="text-sm text-gray-700 cursor-pointer"
      >
        {capitalizeFirstLetter(tag)}
      </label>
    </div>
  );
}
