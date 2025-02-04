import { developerProfilesService } from "@/features";
import { Dashboard } from "@/features/admin";

export default async function Page() {
  const developers = await developerProfilesService.getAll();
  return <Dashboard developers={developers} />;
}
