import { ProjectHighlight } from "./project-highlight";
import { QuoteHighlight } from "./quote-highlight";
import { SkillsHighlight } from "./skills-highlight";
import { VideoHighlight } from "./video-highlight";

export function HighlightedDevelopers() {
  return (
    <section className="flex flex-col justify-center py-8 gap-4">
      <ProjectHighlight />
      <QuoteHighlight />
      <VideoHighlight />
      <SkillsHighlight />
    </section>
  );
}
