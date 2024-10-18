import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

import { ArrowLeftIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export default async function ViewRFPPage({
  params,
}: {
  params: { id: string };
}) {
  const rfp = await api.rfp.get({ id: params.id });
  if (!rfp) redirect("/404");
  return (
    <>
      <a
        href="/listing"
        className="mb-8 inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-[#35394d] bg-[#23283d] px-4 py-3"
      >
        <div className="flex h-[15px] w-[15px] items-center justify-center">
          <ArrowLeftIcon className="size-4" />
        </div>
        <div className="text-center text-sm font-medium leading-[18.20px] text-neutral-50">
          Back to RFP List
        </div>
      </a>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <div className="flex flex-col justify-between overflow-hidden rounded-lg border border-[#393f58] bg-[#23283d] px-4 py-6 shadow-[4px_2px_4px_rgba(25,33,61,0.08)]">
            <article className="flex w-full flex-col">
              <header className="flex w-full flex-col">
                <span className="gap-2.5 self-start rounded-[80px] bg-gray-900 px-3 py-1 text-xs text-sky-400">
                  {rfp.data?.category ?? "General"}
                </span>
                <h2 className="mt-4 text-lg font-medium leading-tight text-neutral-50">
                  {rfp.data?.company ?? "Company Name"}
                </h2>
              </header>
              <section className="mt-4 flex w-full flex-col text-sm">
                <h3 className="font-medium leading-tight text-neutral-50">
                  {rfp.title}
                </h3>
                <p className="mt-1 text-ellipsis leading-5 text-slate-400">
                  {rfp.data?.description ?? "Description"}
                </p>
              </section>
            </article>
            <footer className="mt-16 flex flex-col self-start">
              {rfp.data?.tags && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  {(rfp.data?.tags).map((tag: string, index: number) => (
                    <span key={index}>#{tag}</span>
                  ))}
                </div>
              )}
              <div className="mt-2 flex max-w-full flex-col text-sm font-medium leading-tight">
                <div className="flex w-full items-center gap-3">
                  <span className="my-auto self-stretch text-neutral-50">
                    Deadline:
                  </span>
                  <time className="my-auto self-stretch text-red-400">
                    {rfp.data?.deadline
                      ? new Date(rfp.data?.deadline).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </time>
                </div>
                <div className="mt-3 text-orange-300">
                  {rfp.data?.budget ?? "N/A"}
                </div>
              </div>
            </footer>
          </div>
          {rfp.data?.fileUrl && (
            <div className="mt-8 inline-flex h-[662px] w-full flex-col items-start justify-start gap-8 rounded-lg border border-[#393f58] bg-[#23283d] p-6 shadow">
              <div className="inline-flex items-center justify-between self-stretch">
                <div className="text-base font-medium leading-tight text-neutral-50">
                  {rfp.data?.fileUrl.split("/").pop()}.pdf
                </div>
                <div className="flex items-center justify-center gap-2 rounded-lg border border-[#164bd2] bg-gradient-to-b from-[#2b7afb] via-[#2174fd] to-[#213afd] px-4 py-3 shadow shadow-inner">
                  <div className="relative h-[15px] w-[15px]">
                    <ArrowDownTrayIcon className="size-4" />
                  </div>
                  <a
                    href={rfp.data?.fileUrl}
                    download
                    className="text-center text-sm font-medium leading-[18.20px] text-white"
                  >
                    Download
                  </a>
                </div>
              </div>
              <iframe
                width="100%"
                height="100%"
                src={`https://docs.google.com/gview?url=${rfp.data?.fileUrl}&embedded=true`}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <div className="inline-flex h-[180px] flex-col items-start justify-start gap-6 rounded-lg border border-[#393f58] bg-[#23283d] p-6 shadow">
            <div className="self-stretch text-2xl font-medium leading-loose text-white">
              Contact Information
            </div>
            <div className="flex h-[76px] flex-col items-start justify-start gap-3 self-stretch">
              <div className="inline-flex items-center justify-start gap-1.5">
                <div className="relative h-6 w-6">
                  <MapPinIcon className="size-5" />
                </div>
                <div className="text-lg font-medium leading-loose text-white">
                  {rfp.data?.location ?? "Location"}
                </div>
              </div>
              <div className="inline-flex items-center justify-start gap-1.5 self-stretch">
                <div className="relative h-6 w-6">
                  <EnvelopeIcon className="size-5" />
                </div>
                <div className="text-lg font-medium leading-loose text-white">
                  <a href={`mailto:${rfp.data?.contactEmail}`}>
                    {rfp.data?.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex h-[94px] flex-col items-start justify-start gap-2.5 rounded-lg border border-[#393f58] p-6">
            <div className="flex h-[46px] flex-col items-start justify-start gap-1 self-stretch">
              <div className="self-stretch text-base font-semibold leading-tight text-slate-400">
                Want to generate a RFP File?
              </div>
              <div>
                <span className="text-sm font-bold leading-[21px] text-[#2388ff]">
                  Click here
                </span>
                <span className="text-sm font-normal leading-[21px] text-slate-400">
                  {" "}
                  to upload or create a new file.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
