import { Edit, X } from "lucide-react";
import { EditableField } from "./editable-field";
import { Button } from "@/components";

type Props = {
  school: string;
  date: string;
  title: string;
  description: string;
  isEditable: boolean;
  onDelete: () => void;
};

export function CvBlock({
  school,
  date,
  title,
  description,
  isEditable,
  onDelete,
}: Props) {
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
        {isEditable && (
          <Button variant="link" size="icon" onClick={onDelete}>
            <X size={24} className="cursor-pointer" />
          </Button>
        )}
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
