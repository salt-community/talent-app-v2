import { adminService } from "../instance";
import IdentityProfileList from "./identity-profile-list";

export async function DashboardRoles() {
  const identities = await adminService.getAllIdentities();
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
