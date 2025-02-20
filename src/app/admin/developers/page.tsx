import { developerProfilesService } from "@/features";
import { DeveloperDashboard } from "@/features";

export default async function AdminDevelopersPage() {
  const developers = await developerProfilesService.getAll();
  return <DeveloperDashboard developers={developers} />;
}
