import { H1 } from "@/components";
import IdentityProfileList from "./identity-profile-list";
import { iamService } from "../instance";
import Link from "next/link";

export async function DashboardRoles() {
  const identities = await iamService.getAllIdentities();
  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <div className="flex justify-between">
        <H1>Admin</H1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md">
          <Link
            href={"/admin/developers"}
            className="py-1 px-4 rounded-md text-paragraphLight"
          >
            Developers
          </Link>
          <Link
            href={"/admin/identities"}
            className=" py-1 px-4 rounded-md bg-black text-white"
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
      {identities.map((identity) => (
        <IdentityProfileList
          id={identity.id}
          key={identity.id}
          name={identity.name}
          email={identity.email}
          role={identity.role}
        />
      ))}
    </div>
  );
}
