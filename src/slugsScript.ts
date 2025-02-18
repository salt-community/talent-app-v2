import { insecureDeveloperProfilesService } from "@/features";

async function slugsScript() {
  await insecureDeveloperProfilesService.updateMissingSlugs();
}

slugsScript();
