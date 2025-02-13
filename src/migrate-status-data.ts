import { db } from "./db";
import { insecureDeveloperProfilesService } from "./features";

async function main() {
  const developerProfiles = await insecureDeveloperProfilesService.getAll();

  for (const profile of developerProfiles) {
    await insecureDeveloperProfilesService.updateStatus({
      id: profile.id,
      status: profile.status,
    });
  }

  await db.$client.end();
}

main();
