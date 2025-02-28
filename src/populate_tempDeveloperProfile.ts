import { ConsoleLogWriter } from "drizzle-orm";
import { insecureDeveloperProfilesService } from "./features/developer-profiles";

async function populateTempDeveloperProfile() {
  const developerProfiles = await insecureDeveloperProfilesService.getAll();
  for (const developerProfile of developerProfiles) {
    const background =
      await insecureDeveloperProfilesService.getBackgroundByDeveloperProfileId(
        developerProfile.id
      );
    if (!background) {
      continue;
    }
    const backgroundInsert = {
      ...background,
      background_skills: background.skills,
      background_educations: background.educations,
      background_languages: background.languages,
    };
    await insecureDeveloperProfilesService.addTempDeveloperProfile({
      developerProfile: developerProfile,
      backgrounds: backgroundInsert,
    });
  }
}
populateTempDeveloperProfile();
