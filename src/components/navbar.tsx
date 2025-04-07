import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { HamburgerMenu } from "./ui/hamburger-menu";
import { iamService } from "@/features/iam";
import { developerProfilesService } from "@/features/developer-profiles";

export async function Header() {
  await iamService.controlUser();

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

  return (
    <nav className="w-full h-12 px-3 shadow-xs sticky top-0 z-20 flex bg-background justify-between items-center md:px-10">
      <Link href="/">
        <span>&lt;/salt&gt;</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <SignedOut>
          <div className="flex items-center">
            <div className="border-b border-white hover:border-primary text-sm cursor-pointer">
              <SignInButton>
                <span>Sign in</span>
              </SignInButton>
            </div>
            <div className="ml-2 text-sm text-gray-500">
              <span>SALT members only</span>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
          {hasMenuAccess && <HamburgerMenu permissions={permissions} />}{" "}
        </SignedIn>
      </div>
    </nav>
  );
}
