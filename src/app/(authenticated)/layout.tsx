import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex h-[74px] items-center justify-between border-b border-[#393f58]">
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
          <Image
            className="size-10 rounded-full"
            src="/avatar.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <div className="flex flex-col items-end">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-8",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-16 lg:px-0">{children}</div>
    </>
  );
}
