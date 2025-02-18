import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { HamburgerMenu } from "./ui/hamburger-menu";
import { developerProfilesService, iamService } from "@/features";

export async function Header() {
  //const user = await iamService.controlUser();

  const userIdentity = await iamService.controlUser();

  if (!userIdentity) return null;

  const users = await developerProfilesService.getDeveloperProfileByIdentityId(
    userIdentity.id
  );

  const userWithRole = {
    slug: users.map((user) => user.slug)[0]!,
    role: userIdentity.role,
    id: userIdentity.id,
  };

  if (!userWithRole) return null;

  return (
    <nav className="w-full h-12 px-3 shadow-sm sticky top-0 z-20 flex bg-background justify-between items-center md:px-10">
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
          <HamburgerMenu user={userWithRole} />
        </SignedIn>
      </div>
    </nav>
  );
}
