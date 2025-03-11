import { Edit } from "lucide-react";
import { EditableField } from "./editable-field";

type Props = {
  school: string;
  date: string;
  title: string;
  description: string;
  isEditable: boolean;
};

export function CvBlock({ school, date, title, description, isEditable }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <EditableField
          value={title}
          isEditable={isEditable}
          onChange={(value) => {
            console.log(value);
          }}
        />
        |
        <EditableField
          value={school}
          isEditable={isEditable}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <EditableField
        value={date}
        isEditable={isEditable}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <EditableField
        value={description}
        isEditable={isEditable}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}
