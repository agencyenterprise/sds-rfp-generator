import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
      <div className="prose dark:prose-invert">
        <ReactMarkdown>{rfp.data?.file}</ReactMarkdown>
      </div>
    </div>
  );
}
