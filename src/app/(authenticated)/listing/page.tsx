import { api } from "~/trpc/server";
import { RFPResponse } from "~/types/types";
import ListingPageClient from "./components/ListingPageClient";

interface ListingPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const searchQuery = params.get("searchQuery") || "";
  const sortOption = params.get("sortOption") || "date";
  const page = params.get("page") || "1";

  const input = {
    searchQuery,
    sortOption,
    page: parseInt(page, 10),
  };

  const response: RFPResponse = await api.rfp.list(input);
  const { data: rfps, pagination } = response;

  return (
    <ListingPageClient
      rfps={rfps}
      pagination={pagination}
      initialSearchQuery={searchQuery}
      initialSortOption={sortOption}
      initialPage={page}
    />
  );
}
