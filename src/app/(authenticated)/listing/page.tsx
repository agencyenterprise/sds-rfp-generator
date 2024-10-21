"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ListBulletIcon,
  PlusIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { RFPCard } from "~/components/listing/card";
import { RFPRow } from "~/components/listing/row";
import SearchBar from "~/components/ui/searchbar";
import { api } from "~/trpc/react";
import { type RFP } from "~/types/types";

type SortOption = "date" | "name";
type DisplayMode = "card" | "row";

export default function ListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") ?? "date") as SortOption,
  );
  const [displayMode, setDisplayMode] = useState<DisplayMode>("card");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") ?? "1"),
  );
  const { data } = api.rfp.list.useQuery({
    showMine: searchParams.get("showMine") === "true",
    search,
    sort,
    page: currentPage,
  });
  const { data: rfps = [], pagination } = data ?? {};

  useEffect(() => {
    const query = new URLSearchParams(searchParams);
    query.set("search", search);
    query.set("sort", sort);
    query.set("page", currentPage.toString());
    const url = `${window.location.pathname}?${query}`;
    router.replace(url);
  }, [search, sort, currentPage, router, searchParams]);

  const handleNextPage = () => {
    const totalPages = pagination?.totalPages ?? 1;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isMySubmissionsPage = searchParams.has("showMine");

  return (
    <div>
      <h2 className="mb-2 text-5xl font-medium leading-[65px]">
        {isMySubmissionsPage ? "My Submissions" : "Explore RFPs"}
      </h2>
      <p className="mb-4 text-xl text-slate-400">
        {isMySubmissionsPage
          ? "View your RFPs submissions."
          : "Discover opportunities, find the perfect match"}
      </p>
      <div className="mb-8 flex items-center justify-between gap-4 border border-transparent border-b-[#393F58] pb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search for RFPs..."
        />
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="self-stretch rounded-lg border border-solid border-slate-700 bg-slate-800 py-1.5 pl-3 pr-1.5"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setDisplayMode("card")}
              className={`rounded-lg border p-2 ${displayMode === "card" ? "bg-gray-600" : ""}`}
            >
              <ViewColumnsIcon className="size-5" />
            </button>
            <button
              onClick={() => setDisplayMode("row")}
              className={`rounded-lg border p-2 ${displayMode === "row" ? "bg-gray-600" : ""}`}
            >
              <ListBulletIcon className="size-5" />
            </button>
            <a
              href="/create"
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-[#164bd2] bg-gradient-to-b from-[#2b7afb] via-[#2174fd] to-[#213afd] px-4 py-3 shadow-inner"
            >
              <PlusIcon className="size-4" />
              <div className="text-center text-sm font-medium leading-[18.20px] text-white">
                <span>Create new RFP</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <ul className={displayMode === "card" ? "grid grid-cols-4 gap-4" : ""}>
        {rfps?.map((rfp) =>
          displayMode === "card" ? (
            <RFPCard key={rfp.id} rfp={rfp as RFP} />
          ) : (
            <RFPRow key={rfp.id} rfp={rfp as RFP} />
          ),
        )}
      </ul>
      <div className="my-8 flex items-center justify-center gap-2 pb-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="my-auto flex min-h-[40px] items-center justify-center gap-1 self-stretch whitespace-nowrap rounded-md bg-white/0 py-2.5 pl-2.5 pr-4 text-sm font-medium leading-5 text-slate-400"
        >
          <ArrowLeftIcon className="size-5" />
          <span>Previous</span>
        </button>
        {Array.from(
          { length: pagination?.totalPages ?? 1 },
          (_, index) => index + 1,
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`my-auto size-10 min-h-[40px] self-stretch whitespace-nowrap rounded-md text-sm font-medium leading-5 ${
              currentPage === page
                ? "bg-slate-800 text-neutral-50"
                : "bg-white/0 text-slate-400"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === (pagination?.totalPages ?? 1)}
          className="my-auto flex min-h-[40px] items-center justify-center gap-1 self-stretch whitespace-nowrap rounded-md bg-white/0 py-2.5 pl-2.5 pr-4 text-sm font-medium leading-5 text-slate-400"
        >
          <span>Next</span>
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
