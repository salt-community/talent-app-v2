import {
  developerProfilesService,
  HighlightPage,
} from "@/features";

export default async function Home() {
  
  const highlightedDeveloperProfileIds =
    await developerProfilesService.getHighlightedDeveloperProfileIds();

  return (
    <HighlightPage highlightedDeveloperProfileIds={highlightedDeveloperProfileIds} />
  ) 
}
