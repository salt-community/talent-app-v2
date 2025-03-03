import { insecureDeveloperProfilesService } from "./features/developer-profiles";

async function updateForeignKeys() {
  console.log("started updating foreign keys");
  const backgrounds =
    await insecureDeveloperProfilesService.getAllBackgrounds();
  for (const background of backgrounds) {
    await insecureDeveloperProfilesService.updateForeignKey({
      backgroundId: background.id,
      developerProfileId: background.developerProfileId,
    });
  }
  console.log("done updating!");
}
updateForeignKeys();
