import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RFP, Pagination } from "~/types/types";

interface ListingPageClientProps {
  rfps: RFP[];
  pagination: Pagination;
}

const ListingPageClient: React.FC<ListingPageClientProps> = ({
  rfps,
  pagination,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    router.query.searchQuery || "",
  );
  const [sortOption, setSortOption] = useState(
    router.query.sortOption || "date",
  );
  const [displayMode, setDisplayMode] = useState("row");
  const [currentPage, setCurrentPage] = useState(
    Number(router.query.page) || pagination.currentPage,
  );
  const itemsPerPage = pagination.pageSize;

  useEffect(() => {
    const query = {
      searchQuery,
      sortOption,
      page: currentPage.toString(),
    };
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true },
    );
  }, [searchQuery, sortOption, currentPage]);

  const filteredRfps = rfps
    // TODO: Revise if applicable
    // .filter((rfp) =>
    //   rfp.id.toLowerCase().includes(searchQuery.toLowerCase())
    // )
    .sort((a, b) => {
      if (sortOption === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOption === "name") {
        return a.id.localeCompare(b.id);
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
      <h2>Explore RFPs</h2>
      <p>Discover opportunities, find the perfect match</p>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded border p-2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded border p-2"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
        <button
          onClick={() => setDisplayMode(displayMode === "row" ? "card" : "row")}
          className="rounded border p-2"
        >
          Toggle {displayMode === "row" ? "Card" : "Row"} View
        </button>
      </div>
      <ul className={displayMode === "card" ? "grid grid-cols-3 gap-4" : ""}>
        {paginatedRfps.map((rfp) => (
          <li
            key={rfp.id}
            className={
              displayMode === "card"
                ? "rounded border p-4 shadow"
                : "border-b p-2"
            }
          >
            <a href={`/view/${rfp.id}`}>
              <h3 className="text-lg font-semibold">{rfp.title}</h3>
              <p className="text-sm text-gray-600">
                {rfp.data?.description as String}
              </p>
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
        ))}
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
