"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RFP, Pagination } from "~/types/types";

import SearchBar from "~/components/ui/searchbar";

interface ListingPageClientProps {
  rfps: RFP[];
  pagination: Pagination;
  initialSearchQuery: string;
  initialSortOption: string;
  initialPage: string;
}

interface RFPCardProps {
  rfp: RFP;
}

const RFPcard = ({ rfp }: RFPCardProps) => (
  <article className="flex flex-col justify-between overflow-hidden rounded-lg border border-solid border-slate-700 bg-slate-800 px-4 py-6 shadow-[4px_2px_4px_rgba(25,33,61,0.08)]">
    <div className="flex w-full flex-col">
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
    </div>
    <footer className="mt-16 flex flex-col self-start">
      {(rfp.data?.tags as string[]) && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          {(rfp.data?.tags as string[]).map((tag: string, index: number) => (
            <span key={index} className="my-auto self-stretch">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-2 flex max-w-full flex-col text-sm font-medium leading-tight">
        <div className="flex w-full items-center gap-3">
          <span className="my-auto self-stretch text-neutral-50">
            Deadline:
          </span>
          <time className="my-auto self-stretch text-red-400">
            {(rfp.data?.deadline as string) ?? "N/A"}
          </time>
        </div>
        <div className="mt-3 text-orange-300">
          {(rfp.data?.budget as string) || "N/A"}
        </div>
      </div>
    </footer>
  </article>
);

const RFProw = ({ rfp }: RFPCardProps) => (
  <li key={rfp.id} className={"border-b p-2"}>
    <a href={`/view/${rfp.id}`}>
      <h3 className="text-lg font-semibold">{rfp.title}</h3>
      <p className="text-sm text-gray-600">{rfp.data?.description as string}</p>
      <p className="text-sm text-gray-600">Created by: {rfp.userId}</p>
      <p className="text-sm text-gray-600">
        Created at: {rfp.createdAt.toISOString()}
      </p>
      <p className="text-sm text-gray-600">
        Published at: {rfp.publishedAt?.toISOString()}
      </p>
      <p className="text-sm text-gray-600">
        Updated at: {rfp.updatedAt?.toISOString()}
      </p>
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
      <h2 className="mb-2 text-2xl font-bold">Explore RFPs</h2>
      <p className="mb-4 text-gray-600">
        Discover opportunities, find the perfect match
      </p>
      <div className="mb-4 flex items-center justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for RFPs..."
        />
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded border p-2"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <button
            onClick={() =>
              setDisplayMode(displayMode === "row" ? "card" : "row")
            }
            className="rounded border p-2"
          >
            Toggle {displayMode === "row" ? "Card" : "Row"} View
          </button>
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
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded border p-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded border p-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingPageClient;
