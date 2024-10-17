"use client";
import { useState } from "react";

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

  const filteredRfps = rfps
    .filter((rfp) => rfp.id.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "date") {
        try {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } catch (e) {
          console.error("Error sorting by date", e);
        }
      } else if (sortOption === "name") {
        return a.id.localeCompare(b.id);
      }
      return 0;
    });

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
        {filteredRfps.map((rfp) => (
          <li
            key={rfp.id}
            className={
              displayMode === "card"
                ? "rounded border p-4 shadow"
                : "border-b p-2"
            }
          >
            <a href={`/view/${rfp.id}`}>{rfp.id}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPageClient;
