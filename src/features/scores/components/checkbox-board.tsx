import { type CategoryTag, categoryTags } from "../categories";
import { CategoryCheckbox } from "./category-checkbox";
import { FormLabel } from "./form-label";

type Props = {
  tags?: string[];
  handleChangeTag?: (isChecked: boolean, tag: CategoryTag) => void;
};

export function CheckboxBoard({ tags, handleChangeTag }: Props) {
  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <FormLabel label="Tags" />
      <div className="col-span-3 grid grid-cols-2 gap-2">
        {categoryTags.map((tag, index) => {
          return (
            <CategoryCheckbox
              key={index}
              tag={tag}
              {...(tags !== undefined ? { checked: tags.includes(tag) } : {})}
              handleChangeTag={handleChangeTag}
            />
          );
        })}
      </div>
    </div>
  );
}
