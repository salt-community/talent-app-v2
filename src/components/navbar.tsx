import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { HamburgerMenu } from "./ui/hamburger-menu";
import { iamService } from "@/features/iam";
import { developerProfilesService } from "@/features/developer-profiles";
export async function Header() {
  const userIdentity = await iamService.controlUser();

  // if (userIdentity?.role === "guest") return null;

  const users = await developerProfilesService.getDeveloperProfileByIdentityId(
    userIdentity.id
  );
  const hasMenuAccess =
    await iamService.hasCurrentUserAccess("menu.hamburgerMenu");
  const hasDeveloperAccess =
    await iamService.hasCurrentUserAccess("menu.profile");
  const hasAdminDashboardAccess =
    await iamService.hasCurrentUserAccess("menu.admin");
  const hasInstructorsDashboardAccess = await iamService.hasCurrentUserAccess(
    "menu.instructorsDashboard"
  );
  const permissions = {
    hasAdminDashboardAccess,
    hasDeveloperAccess,
    hasInstructorsDashboardAccess,
  };

  const userWithRole = {
    slug: users.map((user) => user.slug)[0]!,
    role: userIdentity.role,
    id: userIdentity.id,
  };

  return (
    <nav className="w-full h-12 px-3 shadow-xs sticky top-0 z-20 flex bg-background justify-between items-center md:px-10">
      <Link href="/">
        <span>&lt;/salt&gt;</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <SignedOut>
          <div className="border-b border-white hover:border-primary text-sm">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
          {hasMenuAccess && (
            <HamburgerMenu user={userWithRole} permissions={permissions} />
          )}{" "}
        </SignedIn>
      </div>
    </nav>
  );
}
