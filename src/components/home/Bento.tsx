import Image from "next/image";

const Bento = () => (
  <section className="mb-40 flex flex-col items-center px-10 max-md:px-5">
    <h2 className="w-[553px] text-center text-3xl font-medium leading-10 tracking-normal text-white max-md:max-w-full">
      Say goodbye to the confusing and time-consuming RFP craft
    </h2>
    <div className="mt-20 flex w-[1120px] max-w-full flex-wrap items-start gap-4 text-base tracking-normal max-md:mt-10">
      <article className="flex min-h-[400px] w-full flex-col justify-between rounded-xl border border-solid border-white/10 bg-black/10 px-4 py-10 md:w-[260px] md:min-w-[240px]">
        <Image
          className="aspect-square max-w-full self-center rounded-lg object-contain"
          loading="lazy"
          src="/lightning.png"
          alt="Minutes, not days"
          width={200}
          height={200}
        />
        <div className="mt-8 flex w-full flex-col text-center md:text-left">
          <h3 className="font-medium leading-8 text-white">
            Minutes, not days
          </h3>
          <p className="mt-1 leading-7 text-white text-opacity-70">
            Focus on what matters most: driving your project forward.
          </p>
        </div>
      </article>
      <article className="relative flex min-h-[400px] min-w-[240px] flex-1 shrink basis-0 flex-col items-start overflow-hidden rounded-xl px-10 pb-10 pt-72 max-md:max-w-full max-md:px-5 max-md:pt-24">
        <Image
          className="absolute inset-0 z-0 size-full object-cover md:aspect-[2.11] md:min-w-[200%] md:object-contain"
          loading="lazy"
          src="/screenshot-tech.png"
          alt="Designed for tech"
          width={844}
          height={400}
        />
        <div className="absolute left-0 top-0 z-10 size-full bg-gradient-to-t from-[#254DA4] to-transparent" />
        <div className="z-20 flex h-full min-h-[260px] max-w-full flex-col justify-end text-center md:min-h-0 md:text-left">
          <h3 className="font-medium leading-8 text-white md:max-w-full">
            Designed for tech
          </h3>
          <p className="leading-7 text-white text-opacity-70 md:max-w-full">
            Built specifically for companies seeking software, AI/ML, or startup
            products, our platform ensures your RFP speaks the language of
            innovation and precision.
          </p>
        </div>
      </article>
    </div>
  </section>
);

export default Bento;
