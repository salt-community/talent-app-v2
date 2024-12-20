import { H1 } from "@/components";
import { adminService } from "../instance";
import { DeveloperProfileList } from "./developer-profile-list";
import Link from "next/link";

export async function Dashboard() {
  const developers = await adminService.getAllDeveloperProfiles();

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <div className="flex">
        <Link
          href={"/admin/developers"}
          className="py-2 px-4 rounded-md border-solid border-2 border-black"
        >
          Developers
        </Link>
        <Link
          href={"/admin/identities"}
          className="mx-2 py-2 px-4 rounded-md  bg-black text-white"
        >
          Identities
        </Link>
      </div>
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
