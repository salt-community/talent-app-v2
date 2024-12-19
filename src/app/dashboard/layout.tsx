import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider>
        <SignedIn>
          <main className="w-full">{children}</main>;
        </SignedIn>
        
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </>
  );
}
