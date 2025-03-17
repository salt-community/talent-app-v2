import { CvBlock } from "./cv-block";
import { Experience } from "./cv-main-content";

type Props = {
  isEditable: boolean;
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
};

export function ExperienceList({ isEditable, experiences, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {experiences.map((experience, index) => (
        <CvBlock
          key={experience.id}
          experience={experience}
          isEditable={isEditable}
          onDelete={() => {
            onChange(experiences.filter((_, i) => i !== index));
          }}
          onChange={(updatedExperience) => {
            onChange(
              experiences.map((exp, i) =>
                i === index ? updatedExperience : exp,
              ),
            );
          }}
          onMoveUp={() => {
            if (index > 0) {
              const newExperiences = [...experiences];
              [newExperiences[index], newExperiences[index - 1]] = [
                newExperiences[index - 1],
                newExperiences[index],
              ];
              onChange(newExperiences);
            }
          }}
          onMoveDown={() => {
            if (index < experiences.length - 1) {
              const newExperiences = [...experiences];
              [newExperiences[index], newExperiences[index + 1]] = [
                newExperiences[index + 1],
                newExperiences[index],
              ];
              onChange(newExperiences);
            }
          }}
        />
      ))}
    </div>
  );
}
