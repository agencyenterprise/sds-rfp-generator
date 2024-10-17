import { api } from "~/trpc/server";
import ListingPageClient from "./ListingPageClient";

export default async function ListingPageServer() {
  const rfps = await api.rfp.list();
  return <ListingPageClient rfps={rfps} />;
}
