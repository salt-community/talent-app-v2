import { backgroundsService, developerService } from "@/features";
import { ProjectHighlight } from "./project-highlight";
import { QuoteHighlight } from "./quote-highlight";
import { SkillsHighlight } from "./skills-highlight";
import { VideoHighlight } from "./video-highlight";

export async function HighlightedDevelopers() {
  const highlightedDevIds = await developerService.getHighlightedDevIds();
  const highlightedBackgrounds = await backgroundsService.getAllHighlightedBackgrounds(highlightedDevIds);
  console.log(highlightedBackgrounds);

  return (
    <section className="flex flex-col justify-center py-8 gap-4">
      <ProjectHighlight background={highlightedBackgrounds[0]} />
      <QuoteHighlight background={highlightedBackgrounds[0]} />
      <VideoHighlight />
      <SkillsHighlight />
    </section>
  );
}
