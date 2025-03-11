import { H2 } from "@/components";
import { CvBlock } from "./cv-block";

type Props = {
  isEditable: boolean;
};
export function CvMainContent({ isEditable }: Props) {
  return (
    <div>
      <H2>Education and training</H2>
      <CvBlock
        school="University of Technology"
        date="2020 - 2024"
        title="Bachelor of Science in Computer Science"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        isEditable={isEditable}
      />
    </div>
  );
}
