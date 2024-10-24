"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const Hero = () => (
  <section className="mx-4 flex min-h-[80vsh] flex-col items-center pt-16 text-center md:mx-auto">
    <div className="absolute left-0 top-0 z-0 h-full w-[98.82svw] bg-gradient-to-b from-transparent to-black" />
    <div className="relative flex flex-col items-center max-md:max-w-full">
      <div className="flex max-w-[600px] flex-col">
        <h2 className="bg-gradient-to-b from-[#ffffff] to-[#2979fc] bg-clip-text text-7xl font-medium leading-[84px] tracking-tighter text-transparent max-md:max-w-full max-md:text-4xl max-md:leading-10">
          Your AI-powered <br /> RFP generator
        </h2>
        <p className="mt-4 text-xl leading-8 tracking-normal text-white max-md:max-w-full">
          Streamline your process, generate better quality tech RFPs and find
          the best vendors faster
        </p>
        <a
          href="/generate"
          className="mt-10 self-stretch rounded-lg bg-gradient-to-b from-white to-[#6AA2FF] px-12 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:from-[#2979fc] hover:to-[#2979fc] hover:text-white"
        >
          Generate your RFP for free
        </a>
        <Link
          href="/listing"
          className="my-auto mt-8 flex items-center justify-center gap-1.5 self-stretch text-xs font-medium text-white"
        >
          <span>Or explore public RFPs</span>
          <ArrowRightIcon className="size-3" />
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
