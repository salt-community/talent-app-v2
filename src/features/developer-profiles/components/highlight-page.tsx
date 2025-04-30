import { Suspense } from "react";
import { developerProfilesService } from "../instance";
import { HighlightedDevelopers } from "./highlighted-developers";

export async function HighlightPage() {
  const highlightedDeveloperProfiles =
    await developerProfilesService.getHighlightedDeveloperProfiles();

  return (
    <div className="md:px-4 pb-12">
      <HighlightedDevelopers developerProfiles={highlightedDeveloperProfiles} />
    </div>
  );
}
