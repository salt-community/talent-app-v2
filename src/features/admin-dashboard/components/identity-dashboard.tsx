import { adminService } from "../instance";
import IdentityProfileList from "./identity-profile-list";

export async function IdentityDashboard() {
  const identities = await adminService.getAllIdentities();
  return (
    <div className="flex flex-col gap-2">
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
