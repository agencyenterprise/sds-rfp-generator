import { api } from "~/trpc/server";

export default async function ListingPage() {
  const rfps = await api.rfp.list();
  return (
    <div>
      <h1>All RFPs</h1>
      <ul>
        {rfps.map((rfp) => (
          <li key={rfp.id}>{rfp.title}</li>
        ))}
      </ul>
    </div>
  );
}
