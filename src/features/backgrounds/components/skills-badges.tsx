"use client";
import { Badge } from "@/components/ui/badge";
type skill = {
  id: string;
  text: string;
};
type Props = {
  skills: skill[];
};

export function SkillsBadges({ skills }: Props) {
  return (
    <article className="flex justify-end flex-wrap gap-1 mt-3">
      {skills.map((skill) => (
        <Badge className="cursor-pointer" key={skill.id}>
          {skill.text}
        </Badge>
      ))}
    </article>
  );
}
