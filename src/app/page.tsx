import {
  Developers,
  developerProfilesService,
  HighlightPage,
} from "@/features";

export default async function Home() {
  const highlightedDeveloperProfileIds =
    await developerProfilesService.getHighlightedDevIds();

  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? (
    <div className="container mx-auto flex flex-col justify-center px-4 py-4 gap-4">
      <Developers devIds={highlightedDeveloperProfileIds} />
    </div>
  ) : (
    <HighlightPage />
  );
}
