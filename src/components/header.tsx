import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
export async function Header() {
  const { userId } = await auth();

  const user = userId
    ? await (await clerkClient()).users.getUser(userId)
    : null;

  return (
    <header className="w-full h-16 px-8 bg-primary drop-shadow-md sticky top-0 z-50 text-white font-bold flex gap-2 justify-between items-center">
      <div>
        {user && (
          <span className="text-xl">
            Welcome to {"</salt>"}, {user.fullName}!
          </span>
        )}
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
