import { H1 } from "@/components";
import IdentityProfileList from "./identity-profile-list";
import { iamService } from "../instance";

export async function DashboardRoles() {
  const identities = await iamService.getAllIdentities();
  return (
    <div className="container mx-auto flex flex-col justify-center px-4 pt-2 gap-4">
      <H1>Admin</H1>
      {identities.map((identity) => (
        <IdentityProfileList
          id={identity.id}
          key={identity.id}
          // name={identity.name}
          // email={identity.email}
          role={identity.role}
        />
      ))}
    </div>
  );
}
