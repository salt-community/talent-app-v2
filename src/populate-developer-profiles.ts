import { db } from "./db";
import { insecureDeveloperProfilesService } from "./features/developer-profiles";

async function populateDeveloperProfiles() {
  console.log("started populating");
  const developerProfiles = await insecureDeveloperProfilesService.getAll();
  for (const developerProfile of developerProfiles) {
    await insecureDeveloperProfilesService.addDeveloperProfile(
      developerProfile
    );
  }
  console.log("done populating..");
  await db.$client.end();
}
populateDeveloperProfiles();
