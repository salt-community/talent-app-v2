import { H1 } from "@/components";
import IdentityProfileList from "./identity-profile-list";
import { iamService } from "../instance";
import Link from "next/link";

export async function DashboardRoles() {
  const identities = await iamService.getAllIdentities();
  return (
    <div>
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
