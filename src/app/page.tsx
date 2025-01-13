import { Developers, developerService, HighlightPage } from "@/features";

export default async function Home() {
  const highlightedDeveloperProfileIds =
    await developerService.getHighlightedDevIds();

  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? (
    <Developers devIds={highlightedDeveloperProfileIds} />
  ) : (
    <HighlightPage />
  );
}
