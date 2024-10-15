import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
      <div className="prose dark:prose-invert">
        <ReactMarkdown>{rfp.data?.file}</ReactMarkdown>
      </div>
    </div>
  );
}
