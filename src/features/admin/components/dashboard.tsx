import { Command, CommandInput } from "@/components/ui/command";
import { H1 } from "@/components/ui/header/header-h1";
import { DeveloperProfileList } from "./developer-profile-list";
import { adminService } from "../instance";

export async function Dashboard() {
  const developers = await adminService.getAllDeveloperProfiles();

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
              id={developer.id}
              key={developer.id}
              name={developer.name}
              email={developer.email}
              status={developer.status}
            />
          ))
        ) : (
          <p>{developers}</p>
        )}
      </div>
    </div>
  );
}
