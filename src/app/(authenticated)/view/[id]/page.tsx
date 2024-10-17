import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function ViewRFPPage({
  params,
}: {
  params: { id: string };
}) {
  const rfp = await api.rfp.get({ id: params.id });
  if (!rfp) redirect("/404");
  return (
    <div>
      <h1>{rfp.title}</h1>
    </div>
  );
}
