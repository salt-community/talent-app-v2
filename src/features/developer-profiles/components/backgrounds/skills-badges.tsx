"use client";
import { Badge } from "@/components/";
import { SkillInsert } from "../../types";

type Props = {
  skills: SkillInsert[];
};

export function SkillsBadges({ skills }: Props) {
  return (
    <article className="flex flex-wrap gap-1 mt-3">
      {skills.map((skill) => (
        <Badge
          className="cursor-default"
          variant={"secondary"}
          key={skill.name}
        >
          {skill.name}
        </Badge>
      ))}
    </article>
  );
}
