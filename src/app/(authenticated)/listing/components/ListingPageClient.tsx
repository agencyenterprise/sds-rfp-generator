"use client";
import { useState } from "react";
import mockRFPs from "../data/mockRFPs";

interface RFP {
  id: string;
  data: Record<string, unknown> | null;
  userId: string | null;
  createdAt: Date;
  title: string | null;
  publishedAt: Date | null;
  updatedAt: Date | null;
}

interface ListingPageClientProps {
  rfps: RFP[];
}

const ListingPageClient: React.FC<ListingPageClientProps> = ({ rfps }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [displayMode, setDisplayMode] = useState("row");

  // TODO: Use `rfps` from props instead of `mockRFPs`
  const filteredRfps = mockRFPs
    .filter((rfp) =>
      rfp.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        try {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        } catch (e) {
          console.error("Error sorting by date", e);
        }
      } else if (sortOption === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-2 text-2xl font-bold">Explore RFPs</h2>
      <p className="mb-4 text-gray-700">
        Discover opportunities, find the perfect match
      </p>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded border p-2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded border p-2 text-gray-600"
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
      <ul
        className={
          displayMode === "card" ? "grid grid-cols-3 gap-4" : "list-none"
        }
      >
        {filteredRfps.map((rfp) => (
          <li
            key={rfp.id}
            className={
              displayMode === "card"
                ? "rounded border p-4 shadow"
                : "border-b p-2"
            }
          >
            <a href={`/view/${rfp.id}`} className="block">
              <h3 className="text-lg font-semibold">{rfp.title}</h3>
              <p className="text-sm text-gray-600">{rfp.data?.description}</p>
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
    </div>
  );
};

export default ListingPageClient;
