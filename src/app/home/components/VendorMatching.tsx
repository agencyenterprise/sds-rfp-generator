import Image from "next/image";
const VendorMatching = () => (
  <section className="flex flex-col px-8 max-md:pl-5">
    <div className="relative flex flex-col items-start overflow-hidden rounded-lg border border-solid border-white border-opacity-10 px-60 py-20 max-md:max-w-full max-md:px-5">
      <Image
        loading="lazy"
        src="/pattern.png"
        className="absolute left-2/4 top-2/4 z-0 aspect-[2.81] h-[518px] w-[1206px] max-w-full -translate-x-2/4 -translate-y-2/4 rounded-2xl object-contain"
        alt="Pattern Background"
      />
      <div className="absolute left-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#254DA4] to-transparent" />
      <div className="absolute left-2/4 top-2/4 z-0 flex h-[485px] min-h-[429px] w-[1121px] max-w-full -translate-x-2/4 -translate-y-2/4" />
      <div className="z-0 flex w-full flex-col self-stretch max-md:max-w-full">
        <h2 className="self-center text-center text-6xl font-medium leading-none tracking-tighter text-white max-md:max-w-full max-md:text-4xl">
          Instant vendor matching
        </h2>
        <p className="mt-6 text-center text-xl leading-loose tracking-normal text-white max-md:max-w-full">
          Looking for the perfect vendor match? Be the first to try it!
        </p>
        <p className="mt-6 text-center text-base leading-7 tracking-normal text-white text-opacity-70 max-md:max-w-full">
          Soon, our AI will instantly connect you with the top vendors tailored
          to your project's needs. Join the waitlist!
        </p>
        <form className="relative mt-6 flex w-full items-start gap-2.5 self-center rounded-lg border border-solid border-white border-opacity-10 px-4 py-2">
          <label htmlFor="emailInput" className="sr-only">
            Your email
          </label>
          <input
            id="emailInput"
            type="email"
            placeholder="Your email"
            className="w-100 z-0 my-auto border-none bg-transparent text-base leading-loose tracking-normal text-white text-opacity-50"
            aria-label="Your email"
          />
          <button
            type="submit"
            className="absolute inset-y-1 right-1 gap-2 self-start rounded-lg bg-white px-4 py-1 text-center text-base font-medium leading-8 tracking-normal text-black"
          >
            Join waitlist
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default VendorMatching;
