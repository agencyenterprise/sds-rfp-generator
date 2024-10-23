import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex h-[74px] items-center justify-between border-b border-[#393f58]">
        <div className="container mx-auto flex items-center justify-between !px-4 lg:px-0">
          <Link href="/">
            <Image
              className="size-10 rounded-full"
              src="/avatar.png"
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
          <div className="flex items-center gap-8">
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link href="/listing" className="px-4 py-2">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listing?showMine=true"
                    className="rounded-md px-4 py-2"
                  >
                    My Submissions
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
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
        </div>
      </header>
      <div className="container mx-auto !px-4 py-16 lg:px-0">{children}</div>
    </>
  );
}
