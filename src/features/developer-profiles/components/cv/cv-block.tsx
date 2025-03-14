import { ChevronDown, ChevronUp, X } from "lucide-react";
import { EditableField } from "./editable-field";
import { Button } from "@/components";
import { Experience } from "./cv-main-content";
import { on } from "events";

type Props = {
  experience: Experience;
  isEditable: boolean;
  onDelete: () => void;
  onChange: (experience: Experience) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function CvBlock({
  experience,
  isEditable,
  onDelete,
  onChange,
  onMoveUp,
  onMoveDown,
}: Props) {
  return (
    <div className="flex items-start justify-start">
      <div className="flex flex-col gap-1 flex-grow">
        <div className="flex items-center text-paragraph-light font-semibold">
          <EditableField
            placeholder="Role"
            value={experience.role}
            isEditable={isEditable}
            onChange={(role) => onChange({ ...experience, role })}
          />
          |
          <EditableField
            placeholder="Organization"
            value={experience.organization}
            isEditable={isEditable}
            onChange={(organization) =>
              onChange({ ...experience, organization })
            }
          />
        </div>

        <EditableField
          placeholder="Date"
          value={experience.date}
          isEditable={isEditable}
          onChange={(date) => onChange({ ...experience, date })}
        />
        <EditableField
          placeholder="Description"
          value={experience.description}
          isEditable={isEditable}
          onChange={(description) => onChange({ ...experience, description })}
        />
      </div>
      {isEditable && (
        <div className="flex flex-col gap-1">
          <Button
            variant="link"
            size="icon"
            onClick={onDelete}
            className="h-5 w-5"
          >
            <X size={56} className="cursor-pointer" />
          </Button>
          <Button
            variant="link"
            size="icon"
            onClick={onMoveUp}
            className="h-5 w-5"
          >
            <ChevronUp size={56} className="cursor-pointer" />
          </Button>
          <Button
            variant="link"
            size="icon"
            onClick={onMoveDown}
            className="h-5 w-5"
          >
            <ChevronDown size={56} className="cursor-pointer" />
          </Button>
        </div>
      )}
    </div>
  );
}
