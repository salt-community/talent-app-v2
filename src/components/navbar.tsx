import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import Link from "next/link";
export async function Header() {
  // const { userId } = await auth();

  // const user = userId
  //   ? await (await clerkClient()).users.getUser(userId)
  //   : null;

  return (
    <nav className="w-full h-10 px-8 shadow-sm sticky top-0 z-10 flex gap-2 bg-background justify-between items-center">
      {/* <div>
        {user && (
          <span className="text-md">
            Welcome to {"</salt>"}, {user.fullName}!
          </span>
        )}
      </div> */}
      <Link href="/">
      <span>&lt;salt/&gt;</span>
      </Link>
      <div className="flex gap-6">
        <div className="hover:bg-secondary py-1 px-2 rounded-lg text-sm">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  ); }
 


    