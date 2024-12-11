import {
  Command,
  CommandInput,
} from "@/components/ui/command";
import { H1 } from "@/components/ui/header/header-h1";

import { dashboardService } from "../../identity-access-management/instance";
import { DeveloperProfileList } from "./developer-profile-list";

export async function Dashboard() {
  const developers = await dashboardService.getAllDeveloperProfiles();

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 gap-4">
      <H1>Dashboard</H1>
      <Command className="rounded-lg border md:min-w-[450px]">
        <CommandInput placeholder="Search..." />
      </Command>
      <div defaultValue="developers" className="flex flex-col pl-1">
        {Array.isArray(developers) ? (
          developers.map((developer) => (
            <DeveloperProfileList
              key={developer.id}
              name={developer.name}
              email={developer.email}
            />
          ))
        ) : (
          <p>{developers}</p>
        )}
      </div>
    </div>
  );
}
