import { H1 } from "@/components";
import { adminService } from "../instance";
import { DeveloperProfileList } from "./developer-profile-list";

export async function Dashboard() {
  const developers = await adminService.getAllDeveloperProfiles();

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <H1>Admin</H1>
      {developers.map((dev) => (
        <DeveloperProfileList
          id={dev.id}
          key={dev.id}
          name={dev.name}
          email={dev.email}
          status={dev.status}
        />
      ))}
    </div>
  );
}
