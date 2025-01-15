import {
  Developers,
  developerProfilesService,
  HighlightPage,
} from "@/features";

export default async function Home() {
  const highlightedDeveloperProfileIds =
    await developerProfilesService.getHighlightedDevIds();

  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? (
    <Developers devIds={highlightedDeveloperProfileIds} />
  ) : (
    <HighlightPage />
  );
}
