import IdentityProfileList from "./identity-profile-list";
import { iamService } from "../instance";

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
