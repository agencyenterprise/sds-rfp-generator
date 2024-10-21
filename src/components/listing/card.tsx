import { type RFP } from "~/types/types";

export function RFPcard({ rfp }: { rfp: RFP }) {
  return (
    <li className="flex flex-col justify-between overflow-hidden rounded-lg border border-solid border-slate-700 bg-slate-800 px-4 py-6 shadow-[4px_2px_4px_rgba(25,33,61,0.08)]">
      <a href={`/view/${rfp.id}`}>
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
      </a>
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
                ? new Date(rfp.data?.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </time>
          </div>
          <div className="mt-3 text-orange-300">
            {rfp.data?.budget ?? "N/A"}
          </div>
        </div>
      </footer>
    </li>
  );
}
