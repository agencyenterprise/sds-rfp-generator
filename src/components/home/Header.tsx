import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const Header = () => (
  <header className="flex flex-wrap items-center justify-center gap-4 py-2 text-center text-sm font-medium leading-tight">
    <Image
      className="rounded-full"
      width={41.5}
      height={41.5}
      src="/avatar.png"
      alt="Avatar"
    />
    <p className="text-white">
      <span className="font-bold">Made with ❤️ by </span>
      <a href="https://ae.studio" target="_blank">
        AE Studio
      </a>
      . • See what we could build for you
    </p>
    <a
      href="https://ae.studio"
      target="_blank"
      className="flex items-center justify-center gap-2 self-stretch rounded-lg border border-solid border-blue-700 bg-[linear-gradient(180deg,#2B7AFB_0%,#2174FD_100%,#213BFD_100%)] px-4 py-3 text-center text-sm font-medium leading-tight text-white shadow-sm"
    >
      Learn more <ArrowRightIcon className="h-4 w-4" />
    </a>
  </header>
);

export default Header;
