import Image from "next/image";

const Bento = () => (
  <section className="flex flex-col items-center px-10 py-20 max-md:px-5">
    <h2 className="w-[553px] text-center text-3xl font-medium leading-10 tracking-normal text-white max-md:max-w-full">
      Say goodbye to the confusing and time-consuming RFP craft
    </h2>
    <div className="mt-20 flex w-[1120px] max-w-full flex-wrap items-start gap-4 text-base tracking-normal max-md:mt-10">
      <article className="flex min-h-[400px] w-[260px] min-w-[240px] flex-col justify-between rounded-xl border border-solid border-white border-opacity-10 bg-black bg-opacity-10 px-4 py-10">
        <Image
          className="aspect-square max-w-full self-center rounded-lg object-contain"
          loading="lazy"
          src="/lightning.png"
          alt="Minutes, not days"
          width={200}
          height={200}
        />
        <div className="mt-8 flex w-full flex-col">
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
          className="absolute left-2/4 top-2/4 z-0 aspect-[2.11] max-w-full -translate-x-2/4 -translate-y-2/4 object-contain"
          loading="lazy"
          src="/screenshot-tech.png"
          alt="Designed for tech"
          width={844}
          height={400}
        />
        <div className="absolute left-0 top-0 z-0 size-full bg-gradient-to-t from-[#254DA4] to-transparent" />
        <div className="z-0 flex w-[677px] max-w-full flex-col">
          <h3 className="font-medium leading-8 text-white max-md:max-w-full">
            Designed for tech
          </h3>
          <p className="leading-7 text-white text-opacity-70 max-md:max-w-full">
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
