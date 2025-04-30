import { DeveloperDashboard } from "@/features/admin-dashboard";
import { developerProfilesService } from "@/features/developer-profiles";

export default async function Page() {
  const developers = await developerProfilesService.getAll();
  return <DeveloperDashboard developers={developers} />;
}
