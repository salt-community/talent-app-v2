import { ProjectHighlight } from "./project-highlight";
import { QuoteHighlight } from "./quote-highlight";

export function HighlightedDevelopers() {
  return (
    <section className="flex flex-col justify-center py-8">
      <h2 className="text-center text-2xl font-bold mb-6">Developers</h2>
      <ProjectHighlight />
      <QuoteHighlight/>
    </section>
  );
}
