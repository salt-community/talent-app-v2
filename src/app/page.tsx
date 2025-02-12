import {
  developerProfilesService,
  HighlightedDevelopers,
  HighlightPage,
} from "@/features";

export default async function Home() {
  
  const highlightedDeveloperProfileIds =
    await developerProfilesService.getHighlightedDeveloperProfileIds();

  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? (
    <div>
      <h2 className="text-center text-5xl font-extrabold pt-16 text-header">
        Our Developers in Focus
      </h2>
      <h3 className="text-center text-lg pt-6 text-paragraphLight px-6">
        Each developer has a unique story, skill set, and impact on the tech
        world. Meet a standout talent and explore their journey.
      </h3>
      <div className="md:px-4 pb-12">
        <HighlightedDevelopers
          developerProfileIds={highlightedDeveloperProfileIds}
        />
      </div>
    </div>
  ) : (
    <HighlightPage />
  );
}
