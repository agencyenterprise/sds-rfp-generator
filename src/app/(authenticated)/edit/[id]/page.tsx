import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

import { EditForm } from "~/components/edit/edit-form";
import { PublishButton } from "~/components/edit/publish-button";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function EditRFPPage({
  params,
}: {
  params: { id: string };
}) {
  const rfp = await api.rfp.get({ id: params.id });

  if (!rfp) redirect("/404");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="space-y-8">
        <div className="flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/listing">
              <ArrowLeftIcon className="mr-2 size-4 text-primary" />
              Back
            </Link>
          </Button>
          <PublishButton id={rfp.id} />
        </div>
        <header className="space-y-1.5">
          <h1 className="text-5xl font-medium text-white">Edit RFP</h1>
          <p className="text-xl font-normal text-slate-400">
            Fill the form below to edit RFP
          </p>
        </header>
        <div className="space-y-8 rounded-lg border border-[#393f58] bg-[#23283d] p-6 shadow">
          <div className="flex flex-col-reverse items-end justify-between gap-4 lg:flex-row lg:items-start">
            <a
              className="flex w-full flex-col gap-2 overflow-hidden"
              href={rfp.data?.fileUrl}
              download
            >
              <div className="flex items-center gap-2">
                <ArrowDownTrayIcon className="size-4 text-primary" />
                <div className="text-sm font-medium text-neutral-50">
                  File Uploaded
                </div>
              </div>
              <div className="text-xs text-slate-400">
                {rfp.data?.fileUrl
                  ? `${rfp.data.fileUrl.split("/").pop()}.pdf`
                  : "No file uploaded"}
              </div>
            </a>
            <div className="inline-block rounded-full bg-[#131a23] px-3 py-1 text-sm text-[#47b0ff]">
              {rfp.publishedAt ? "Published" : "Draft"}
            </div>
          </div>
          <EditForm id={rfp.id} title={rfp.title!} data={rfp.data!} />
        </div>
      </div>
    </div>
  );
}
