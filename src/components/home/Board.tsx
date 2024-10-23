'use client';

import {
  ArrowRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid";

import { api } from "~/trpc/react";
import { type RFP } from "~/types/types";



const RFPCard = ({rfp}: {rfp: RFP}) => (
  <article className="w-[214px] min-w-[255px] shrink-0 grow">
    <a href={`/view/${rfp.id}`} className="flex h-full items-start gap-2 overflow-hidden rounded-lg border border-slate-800 bg-slate-800 px-4 py-6 shadow-sm">
      <div className="aspect-square w-12 shrink-0 rounded-full bg-[#94A3B8] p-2">
        <DocumentTextIcon className="size-8" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col text-sm">
          <h2 className="font-medium leading-5 text-gray-100">{rfp.title}</h2>
          <p className="mt-1 text-ellipsis leading-5 text-gray-400">
            {rfp.data?.description ?? "Description"}	
          </p>
        </div>
        <div className="mt-3 flex h-full flex-col text-sm font-medium leading-tight">
          <div className="flex gap-3">
            <span className="text-neutral-50">Deadline:</span>
            <time className="text-red-400">
              {rfp.data?.deadline
                ? new Date(rfp.data?.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </time>
          </div>
          <div className="mt-3 text-orange-300">
            {rfp.data?.budget ?? "N/A"}
          </div>
        </div>
      </div>
    </a>
  </article>
);

const Board = () => {
  const { data } = api.rfp.list.useQuery({
    sort: 'date',
    page: 1,
  });
  const { data: rfps = [] } = data ?? {};

  return (
  <section className="container m-auto flex flex-col justify-center pb-40 pt-20 max-md:pb-24">
    <header className="flex w-full flex-col justify-center text-center text-white max-md:max-w-full">
      <h1 className="text-6xl font-medium leading-none tracking-tighter max-md:text-4xl">
        Explore RFPs
      </h1>
      <p className="mt-1.5 text-xl leading-loose tracking-normal max-md:max-w-full">
        Discover opportunities, find the perfect match
      </p>
    </header>
    <div className="mt-10 flex w-full flex-wrap items-stretch gap-4 max-md:max-w-full">
      {rfps.map((rfp, index) => (
        index < 4 && <RFPCard key={index} rfp={rfp as RFP} />
      ))}
    </div>
    <div className="mt-10 flex w-60 max-w-full flex-col items-center justify-center self-center overflow-hidden rounded-xl text-center text-sm font-medium leading-tight text-white">
      <a
        href="/listing"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-solid border-blue-700 bg-gradient-to-b from-[#2B7AFB] via-[#2174FD] to-[#213BFD] px-4 py-3 shadow-sm hover:from-[#2979fc] hover:to-[#2979fc] hover:text-white"
      >
        <span>See all</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </div>
    <a
      href="/generate"
      className="mt-10 flex items-center justify-center gap-1.5 self-center text-center text-xs font-medium leading-tight text-white"
    >
      <span className="my-auto self-stretch">Or generate yours</span>
      <ArrowRightIcon className="size-3" />
    </a>
  </section>
);
};

export default Board;
