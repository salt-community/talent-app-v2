"use client";
import { Badge, Button } from "@/components/";
import { SkillInsert } from "../../types";
import { X } from "lucide-react";

type Props = {
  skills: SkillInsert[];
  isEditable?: boolean;
  onDelete?: (skill: SkillInsert) => void;
};

export function SkillsBadges({
  skills,
  isEditable = false,
  onDelete = () => {},
}: Props) {
  return (
    <article className="flex flex-wrap gap-1 mt-3">
      {skills.map((skill) => (
        <Badge
          className="cursor-default"
          variant={"secondary"}
          key={skill.name}
        >
          {skill.name}{" "}
          {isEditable && (
            <Button
              variant="link"
              size="icon"
              className="h-4 w-4 ml-1"
              onClick={() => onDelete(skill)}
            >
              <X size={12} />
            </Button>
          )}
        </Badge>
      ))}
    </article>
  );
}
