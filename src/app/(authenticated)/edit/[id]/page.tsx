import { redirect } from "next/navigation";

import { PublishButton } from "~/components/edit/publish-button";
import { api } from "~/trpc/server";

export default async function EditRFPPage({
  params,
}: {
  params: { id: string };
}) {
  const rfp = await api.rfp.get({ id: params.id });
  if (!rfp) redirect("/404");
  return (
    <div>
      <div className="flex justify-between">
        <h2>Edit RFP</h2>
        <PublishButton id={rfp.id} publishedAt={rfp.publishedAt} />
      </div>
      <textarea
        value={JSON.stringify(rfp.data, null, 2)}
        className="h-screen w-full dark:bg-black"
      />
    </div>
  );
}
