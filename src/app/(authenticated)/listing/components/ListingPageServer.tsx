import { api } from "~/trpc/server";
import { useRouter } from "next/router";
import { RFPResponse } from "~/types/types";
import ListingPageClient from "./ListingPageClient";

export default async function ListingPageServer() {
  const router = useRouter();
  const { searchQuery = "", sortOption = "date", page = "1" } = router.query;

  const input = {
    searchQuery: searchQuery as string,
    sortOption: sortOption as string,
    page: parseInt(page as string, 10),
  };

  const response: RFPResponse = await api.rfp.list(input);
  const { data: rfps, pagination } = response;
  return <ListingPageClient rfps={rfps} pagination={pagination} />;
}
