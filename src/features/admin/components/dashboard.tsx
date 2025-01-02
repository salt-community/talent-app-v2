import { H1 } from "@/components";
import { adminService } from "../instance";
import { DeveloperProfileList } from "./developer-profile-list";
import Link from "next/link";

export async function Dashboard() {
  const developers = await adminService.getAllDeveloperProfiles();

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <div className="flex justify-between ">
        <H1>Admin</H1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md">
          <Link
            href={"/admin/developers"}
            className="py-1 px-4 rounded-md  bg-black text-white"
          >
            Developers
          </Link>
          <Link
            href={"/admin/identities"}
            className="mx-2 py-1 px-4 rounded-md text-paragraphLight"
          >
            Identities
          </Link>
          <Link
            href={"/admin/meilisearch-configuration"}
            className="py-1 px-4 rounded-md text-paragraphLight"
          >
            Search Configuration
          </Link>
        </div>
      </div>
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
