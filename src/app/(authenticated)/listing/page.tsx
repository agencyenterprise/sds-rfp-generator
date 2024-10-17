import { api } from "~/trpc/server";

export default async function ListingPage() {
  const rfps = await api.rfp.list({});
  return (
    <div>
      <h1>All RFPs</h1>
      <ul>
        {rfps.data.map((rfp) => (
          <li key={rfp.id}>
            <a href={`/view/${rfp.id}`}>{rfp.id}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
