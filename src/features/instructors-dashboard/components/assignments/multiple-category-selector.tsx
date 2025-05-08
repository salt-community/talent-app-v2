// multiple-category-selector.tsx
import React from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
  { label: "frontend", value: "Frontend" },
  { label: "backend", value: "Backend" },
  { label: "management", value: "Management" },
  { label: "conversation", value: "Conversation" },
  { label: "team collaboration", value: "Team Collaboration" },
  { label: "design", value: "Design" },
];

type MultipleCategorySelectorProps = {
  value?: Option[];
  onChange?: (value: Option[]) => void;
};

export const MultipleCategorySelector = ({
  value = [],
  onChange = () => {},
}: MultipleCategorySelectorProps) => {
  return (
    <MultipleSelector
      value={value}
      onChange={onChange}
      creatable
      defaultOptions={OPTIONS}
      badgeClassName="bg-primary"
      placeholder="Select frameworks..."
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>
      }
    />
  );
};
