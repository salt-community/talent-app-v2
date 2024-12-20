import { H1 } from "@/components";
import IdentityProfileList from "./identity-profile-list";
import { iamService } from "../instance";
import Link from "next/link";

export async function DashboardRoles() {
  const identities = await iamService.getAllIdentities();
  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <div className="flex">
        <Link
          href={"/admin/developers"}
          className=" py-2 px-4 rounded-md bg-black text-white"
        >
          Developers
        </Link>
        <Link
          href={"/admin/identities"}
          className="mx-2 py-2 px-4 rounded-md border-solid border-2 border-black"
        >
          Identities
        </Link>
      </div>
      <H1>Admin</H1>
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
