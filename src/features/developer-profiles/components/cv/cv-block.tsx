import { X } from "lucide-react";
import { EditableField } from "./editable-field";
import { Button } from "@/components";
import { Experience } from "./cv-main-content";

type Props = {
  experience: Experience;
  isEditable: boolean;
  onDelete: () => void;
};

export function CvBlock({ experience, isEditable, onDelete }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <EditableField
          value={experience.role}
          isEditable={isEditable}
          onChange={(value) => {
            console.log(value);
          }}
        />
        |
        <EditableField
          value={experience.organization}
          isEditable={isEditable}
          onChange={(value) => {
            console.log(value);
          }}
        />
        {isEditable && (
          <Button variant="link" size="icon" onClick={onDelete}>
            <X size={24} className="cursor-pointer" />
          </Button>
        )}
      </div>
      <EditableField
        value={experience.date}
        isEditable={isEditable}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <EditableField
        value={experience.description}
        isEditable={isEditable}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}
