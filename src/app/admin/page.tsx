import { developerProfilesService } from "@/features";
import { Dashboard } from "@/features/admin";
import { DevelopersProvider } from "@/features/developer-profiles/developer-context";

export default async function Page() {
  const developers = await developerProfilesService.getAll();

  return (
    <DevelopersProvider initialDevelopers={developers}>
      <Dashboard />
    </DevelopersProvider>
  );
}
