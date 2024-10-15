import { SignInButton } from "@clerk/nextjs";

import { SignedOut } from "@clerk/nextjs";

import { UserButton } from "@clerk/nextjs";

import { SignedIn } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex justify-end p-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
      {children}
    </>
  );
}
