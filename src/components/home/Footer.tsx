import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const Footer = () => (
  <footer className="container m-auto flex flex-col items-center justify-center px-32 py-40 max-md:px-5 max-md:py-24">
    <div className="flex w-[150px] max-w-full flex-col">
      <Image
        loading="lazy"
        src="/ae-studio.svg"
        alt="Company logo"
        className="aspect-[4.17] w-full object-contain"
        width={625}
        height={150}
      />
    </div>
    <section className="text-center text-white">
      <h1 className="mt-10 text-3xl font-medium leading-none tracking-normal max-md:max-w-full">
        {"Let's create human agency"}
      </h1>
      <p className="mt-10 self-stretch text-xl leading-8 tracking-normal max-md:max-w-full">
        We are a development, data science, and design studio that partners with
        visionaries to create cutting-edge AI. Together, we build products that
        amplify human potential and transform industries.
      </p>
    </section>
    <div className="mt-10 flex flex-col items-center justify-center overflow-hidden rounded-xl text-center text-sm font-medium leading-tight text-white">
      <a
        href="https://ae.studio"
        target="_blank"
        className="flex items-center justify-center gap-2 rounded-lg border border-solid border-blue-700 bg-gradient-to-b from-[#2B7AFB] via-[#2174FD] to-[#213BFD] px-10 py-3 shadow-sm hover:from-[#2979fc] hover:to-[#2979fc] hover:text-white max-md:px-5"
      >
        <span className="my-auto self-stretch">
          Bring Your AI Vision to Life with Us
        </span>
        <ArrowRightIcon className="size-4" />
      </a>
    </div>
  </footer>
);

export default Footer;
