import { redirect } from "next/navigation";

import { EditForm } from "~/components/edit/edit-form";
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
      <EditForm id={rfp.id} title={rfp.title!} data={rfp.data!} />
    </div>
  );
}
