import { type RFP } from "~/types/types";

export function RFPRow({ rfp }: { rfp: RFP }) {
  return (
    <li key={rfp.id} className={"border-b p-2"}>
      <a href={`/view/${rfp.id}`}>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-[80px] bg-gray-800 px-3 py-1 text-xs text-sky-400">
                {rfp.data?.category ?? "General"}
              </span>
              <time className="text-red-400">
                {rfp.data?.deadline
                  ? new Date(rfp.data?.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </time>
            </div>
            <h2 className="mt-2 text-lg font-medium leading-tight text-neutral-50">
              {rfp.data?.company ?? "Company Name"}
            </h2>
            <h3 className="mt-1 text-sm font-medium leading-tight text-neutral-50">
              {rfp.title}
            </h3>
            <p className="mt-1 text-sm leading-5 text-slate-400">
              {rfp.data?.description ?? "Description"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              {rfp.data?.tags?.map((tag: string, index: number) => (
                <span key={index}>#{tag}</span>
              ))}
            </div>
            <div className="mt-2 text-orange-300">
              {rfp.data?.budget ?? "N/A"}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
