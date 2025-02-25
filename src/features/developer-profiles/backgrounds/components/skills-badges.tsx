"use client";
import { Badge } from "@/components/";
import { SkillSelect } from "../types";

type Props = {
  skills: SkillSelect[];
};

export function SkillsBadges({ skills }: Props) {
  return (
    <article className="flex flex-wrap gap-1 mt-3">
      {skills.map((skill) => (
        <Badge className="cursor-default" key={skill.id}>
          {skill.name}
        </Badge>
      ))}
    </article>
  );
}
