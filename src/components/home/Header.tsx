import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import { Button } from "~/components/ui/button";

const Header = () => (
  <header className="relative z-10 flex flex-wrap items-center justify-center gap-4 py-2 text-center text-sm font-medium leading-tight">
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
    <Button variant="default" asChild>  
      <a href="https://ae.studio" target="_blank">Learn more <ArrowRightIcon className="ml-2 size-4" /></a>  
    </Button>  
  </header>
);

export default Header;
