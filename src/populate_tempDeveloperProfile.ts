import { insecureDeveloperProfilesService } from "./features/developer-profiles";

async function populateTempDeveloperProfile() {
  const developerProfiles = await insecureDeveloperProfilesService.getAll();
  for (const developerProfile of developerProfiles) {
    const background = await insecureDeveloperProfilesService.getBackgroundById(
      developerProfile.id
    );
    if (!background) {
      continue;
    }

    await insecureDeveloperProfilesService.addTempDeveloperProfile({
      developerProfile: developerProfile,
      backgrounds: background,
    });
  }
}
populateTempDeveloperProfile();
