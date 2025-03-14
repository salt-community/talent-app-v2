import { X } from "lucide-react";
import { EditableField } from "./editable-field";
import { Button } from "@/components";
import { Experience } from "./cv-main-content";

type Props = {
  experience: Experience;
  isEditable: boolean;
  onDelete: () => void;
  onChange: (experience: Experience) => void;
};

export function CvBlock({ experience, isEditable, onDelete, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center text-paragraph-light font-semibold">
        <EditableField
          value={experience.role}
          isEditable={isEditable}
          onChange={(role) => onChange({...experience, role})}
        />
        |
        <EditableField
          value={experience.organization}
          isEditable={isEditable}
          onChange={(organization) => onChange({...experience, organization})}

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
        onChange={(date) => onChange({...experience, date})}

      />
      <EditableField
        value={experience.description}
        isEditable={isEditable}
        onChange={(description) => onChange({...experience, description})}

      />
    </div>
  );
}
