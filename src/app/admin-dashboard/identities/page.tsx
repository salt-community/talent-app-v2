import { IdentityDashboard } from "@/features/admin-dashboard/components/identity-dashboard";
import { adminService } from "@/features/admin-dashboard/instance";

export default async function Page() {
  const identities = await adminService.getAllIdentities();
  return <IdentityDashboard identities={identities} />;
}
