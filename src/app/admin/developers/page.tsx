import { developerProfilesService } from "@/features";
import { DeveloperDashboard } from "@/features/admin-dashboard";

export default async function AdminDevelopersPage() {
  const developers = await developerProfilesService.getAll();
  return <DeveloperDashboard developers={developers} />;
}
