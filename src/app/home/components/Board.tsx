import {
  ArrowRightIcon,
  DocumentTextIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";

interface RFPData {
  title: string;
  description: string;
  views: number;
}

const rfpData: RFPData[] = [
  {
    title: "Custom AI-Driven CRM Development",
    description:
      "Seeking a vendor to build a custom AI-powered CRM that automates customer...",
    views: 7400,
  },
  {
    title: "Blockchain-Powered Payment Platform",
    description:
      "Looking for developers to create a secure, scalable blockchain payment...",
    views: 2400,
  },
  {
    title: "Healthcare Data Visualization Dashboard",
    description:
      "Requesting a partner to design and implement an interactive dashboard for...",
    views: 134,
  },
  {
    title: "Machine Learning Model for Predictive Analytics",
    description:
      "Seeking machine learning experts to develop predictive analytics...",
    views: 7400,
  },
];

const RFPCard = ({ title, description, views }: RFPData) => (
  <article className="my-auto flex w-[214px] min-w-[255px] shrink grow items-start gap-2 self-stretch overflow-hidden rounded-lg border border-solid border-slate-800 bg-slate-800 px-4 py-6 shadow-sm">
    <div className="aspect-square w-12 shrink-0 rounded-full bg-[#94A3B8] p-2">
      <DocumentTextIcon className="h-8 w-8" />
    </div>
    <div className="flex flex-1 shrink basis-0 flex-col">
      <div className="flex w-full flex-col text-sm">
        <h2 className="font-medium leading-5 text-gray-100">{title}</h2>
        <p className="mt-1 text-ellipsis leading-5 text-gray-400">
          {description}
        </p>
      </div>
      <div className="mt-4 flex w-full items-center justify-between whitespace-nowrap text-xs font-medium leading-tight text-gray-400">
        <div className="my-auto flex w-full flex-1 shrink basis-0 items-center gap-1.5 self-stretch">
          <div className="my-auto aspect-square w-4 shrink-0 self-stretch object-contain">
            <HeartIcon className="h-4 w-4 text-[#2388FF]" />
          </div>
          <span className="my-auto self-stretch">{views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </article>
);

const Board = () => (
  <section className="flex flex-col justify-center pb-40 pt-20 max-md:pb-24">
    <header className="flex w-full flex-col justify-center text-center text-white max-md:max-w-full">
      <h1 className="text-6xl font-medium leading-none tracking-tighter max-md:text-4xl">
        Explore RFPs
      </h1>
      <p className="mt-1.5 text-xl leading-loose tracking-normal max-md:max-w-full">
        Discover opportunities, find the perfect match
      </p>
    </header>
    <div className="mt-10 flex w-full flex-wrap items-center gap-4 max-md:max-w-full">
      {rfpData.map((rfp, index) => (
        <RFPCard key={index} {...rfp} />
      ))}
    </div>
    <div className="mt-10 flex w-60 max-w-full flex-col items-center justify-center self-center overflow-hidden rounded-xl text-center text-sm font-medium leading-tight text-white">
      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-solid border-blue-700 bg-gradient-to-b from-[#2B7AFB] via-[#2174FD] to-[#213BFD] px-4 py-3 shadow-sm hover:from-[#2979fc] hover:to-[#2979fc] hover:text-white">
        <span className="my-auto self-stretch">See all</span>
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
    <div className="mt-10 flex items-center justify-center gap-1.5 self-center text-center text-xs font-medium leading-tight text-white">
      <span className="my-auto self-stretch">Or generate yours</span>
      <ArrowRightIcon className="h-3 w-3" />
    </div>
  </section>
);

export default Board;
