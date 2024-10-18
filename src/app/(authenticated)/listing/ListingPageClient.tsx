"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RFP, Pagination } from "~/types/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ListBulletIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "~/components/ui/searchbar";

interface ListingPageClientProps {
  rfps: RFP[];
  pagination: Pagination;
  initialSearchQuery: string;
  initialSortOption: string;
  initialPage: string;
}

interface RFPItemProps {
  rfp: RFP;
}

const RFPcard = ({ rfp }: RFPItemProps) => (
  <li className="flex flex-col justify-between overflow-hidden rounded-lg border border-solid border-slate-700 bg-slate-800 px-4 py-6 shadow-[4px_2px_4px_rgba(25,33,61,0.08)]">
    <a href={`/view/${rfp.id}`}>
      <article className="flex w-full flex-col">
        <header className="flex w-full flex-col">
          <span className="gap-2.5 self-start rounded-[80px] bg-gray-900 px-3 py-1 text-xs text-sky-400">
            {(rfp.data?.category as string) ?? "General"}
          </span>
          <h2 className="mt-4 text-lg font-medium leading-tight text-neutral-50">
            {(rfp.data?.company as string) ?? "Company Name"}
          </h2>
        </header>
        <section className="mt-4 flex w-full flex-col text-sm">
          <h3 className="font-medium leading-tight text-neutral-50">
            {rfp.title}
          </h3>
          <p className="mt-1 text-ellipsis leading-5 text-slate-400">
            {(rfp.data?.description as string) ?? "Description"}
          </p>
        </section>
      </article>
    </a>
    <footer className="mt-16 flex flex-col self-start">
      {(rfp.data?.tags as string[]) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          {(rfp.data?.tags as string[]).map((tag: string, index: number) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>
      )}
      <div className="mt-2 flex max-w-full flex-col text-sm font-medium leading-tight">
        <div className="flex w-full items-center gap-3">
          <span className="my-auto self-stretch text-neutral-50">
            Deadline:
          </span>
          <time className="my-auto self-stretch text-red-400">
            {rfp.data?.deadline
              ? new Date(rfp.data?.deadline as Date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" },
                )
              : "N/A"}
          </time>
        </div>
        <div className="mt-3 text-orange-300">
          {(rfp.data?.budget as string) || "N/A"}
        </div>
      </div>
    </footer>
  </li>
);

const RFProw = ({ rfp }: RFPItemProps) => (
  <li key={rfp.id} className={"border-b p-2"}>
    <a href={`/view/${rfp.id}`}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="rounded-[80px] bg-gray-800 px-3 py-1 text-xs text-sky-400">
              {(rfp.data?.category as string) ?? "General"}
            </span>
            <time className="text-red-400">
              {rfp.data?.deadline
                ? new Date(rfp.data?.deadline as Date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )
                : "N/A"}
            </time>
          </div>
          <h2 className="mt-2 text-lg font-medium leading-tight text-neutral-50">
            {(rfp.data?.company as string) ?? "Company Name"}
          </h2>
          <h3 className="mt-1 text-sm font-medium leading-tight text-neutral-50">
            {rfp.title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            {(rfp.data?.description as string) ?? "Description"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {(rfp.data?.tags as string[])?.map((tag: string, index: number) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
          <div className="mt-2 text-orange-300">
            {(rfp.data?.budget as string) || "N/A"}
          </div>
        </div>
      </div>
    </a>
  </li>
);

const ListingPageClient: React.FC<ListingPageClientProps> = ({
  rfps,
  pagination,
  initialSearchQuery,
  initialSortOption,
  initialPage,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [displayMode, setDisplayMode] = useState("card");
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const itemsPerPage = pagination.pageSize;

  useEffect(() => {
    const query = new URLSearchParams({
      searchQuery,
      sortOption,
      page: currentPage.toString(),
    }).toString();

    const url = `${window.location.pathname}?${query}`;
    router.replace(url);
  }, [searchQuery, sortOption, currentPage]);

  const filteredRfps = rfps
    .filter((rfp) =>
      rfp.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOption === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const totalPages = pagination.totalPages;
  const paginatedRfps = filteredRfps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-5xl font-medium leading-[65px]">Explore RFPs</h2>
      <p className="mb-4 text-xl text-slate-400">
        Discover opportunities, find the perfect match
      </p>
      <div className="mb-8 flex items-center justify-between gap-4 border border-transparent border-b-[#393F58] pb-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for RFPs..."
        />
        <div className="flex gap-2">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="self-stretch rounded-lg border border-solid border-slate-700 bg-slate-800 py-1.5 py-3 pl-3 pr-1.5"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setDisplayMode("card")}
              className={`rounded border p-2 ${displayMode === "card" ? "bg-gray-600" : ""}`}
            >
              <ViewColumnsIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setDisplayMode("row")}
              className={`rounded border p-2 ${displayMode === "row" ? "bg-gray-600" : ""}`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <ul className={displayMode === "card" ? "grid grid-cols-4 gap-4" : ""}>
        {paginatedRfps.map((rfp) =>
          displayMode === "card" ? (
            <RFPcard key={rfp.id} rfp={rfp} />
          ) : (
            <RFProw key={rfp.id} rfp={rfp} />
          ),
        )}
      </ul>
      <div className="my-8 flex items-center justify-center gap-2 pb-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="my-auto flex min-h-[40px] items-center justify-center gap-1 self-stretch whitespace-nowrap rounded-md bg-white bg-opacity-0 py-2.5 pl-2.5 pr-4 text-sm font-medium leading-5 text-slate-400"
        >
          <ArrowLeftIcon className="size-5" />
          <span>Previous</span>
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`my-auto h-10 min-h-[40px] w-10 self-stretch whitespace-nowrap rounded-md text-sm font-medium leading-5 ${
                currentPage === page
                  ? "bg-slate-800 text-neutral-50"
                  : "bg-white bg-opacity-0 text-slate-400"
              }`}
            >
              {page}
            </button>
          ),
        )}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="my-auto flex min-h-[40px] items-center justify-center gap-1 self-stretch whitespace-nowrap rounded-md bg-white bg-opacity-0 py-2.5 pl-2.5 pr-4 text-sm font-medium leading-5 text-slate-400"
        >
          <span>Next</span>
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ListingPageClient;
