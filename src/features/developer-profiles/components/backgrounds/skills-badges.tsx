"use client";
import { Badge, Button } from "@/components/";
import { SkillInsert } from "../../types";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  skills: SkillInsert[];
  variant?: "default" | "secondary" | "cv";
  isEditable?: boolean;
  onDelete?: (skill: SkillInsert) => void;
};

export function SkillsBadges({
  skills,
  variant = "default",
  isEditable = false,
  onDelete = () => {},
}: Props) {
  return (
    <article className="flex flex-wrap gap-1 mt-3">
      {skills.map((skill, index) => (
        <Badge
          className={cn(
            "cursor-default",
            variant === "secondary" && "text-sm truncate",
            variant === "cv" && "text-white bg-gray-700"
          )}
          variant={"secondary"}
          key={index}
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
