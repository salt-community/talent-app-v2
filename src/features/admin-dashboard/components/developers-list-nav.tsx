import { developerProfilesService } from "@/features/developer-profiles";
import { DeveloperNav } from "./developers-nav";

export async function DeveloperListNav() {
    const developers = await developerProfilesService.getAll();
    return <DeveloperNav developers={developers} />;
  }
  