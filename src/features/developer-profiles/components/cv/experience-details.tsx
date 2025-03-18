import { EditableField } from "./editable-field";
import { Experience } from "./cv-main-content";

type Props = {
  experience: Experience;
  isEditable: boolean;
  onChange: (experience: Experience) => void;
};

export function ExperienceDetails({ experience, isEditable, onChange }: Props) {
  return (
    <div className="flex items-start justify-start w-full">
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
    </div>
  );
}
