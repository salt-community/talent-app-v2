import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { HamburgerMenu } from "./ui/hamburger-menu";
import { iamService } from "@/features/iam/instance";

export async function Header() {
  await iamService.controlUser();

  return (
    <nav className="w-full h-10 px-3 shadow-sm sticky top-0 z-20 flex bg-background justify-between items-center md:px-10">
      <Link href="/">
        <span>&lt;salt/&gt;</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="border-b border-white hover:border-primary  text-sm">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <HamburgerMenu />
      </div>
    </nav>
  );
}
