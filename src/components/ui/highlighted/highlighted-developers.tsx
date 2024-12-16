import { ProjectHighlight } from "./project-highlight";
import { QuoteHighlight } from "./quote-highlight";
import { SkillsHighlight } from "./skills-highlight";
import { VideoHighlight } from "./video-highlight";

export function HighlightedDevelopers() {
  return (
    <section className="flex flex-col justify-center py-8 gap-4">
      <h2 className="text-center text-2xl font-bold mb-6">Developers</h2>
      <ProjectHighlight />
      <QuoteHighlight/>
      <VideoHighlight/>
      <SkillsHighlight/>
    </section>
  );
}
