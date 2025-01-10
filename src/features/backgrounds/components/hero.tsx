import Image from "next/image";

export function Hero() {
  return (
    <>
      <section className="relative flex flex-col items-center md:pr-96 justify-center text-center gap-4 md:py-60 py-40">
        <Image
          src="/hero.jpg"
          alt="Hero background"
          className="object-cover"
          fill
          priority
        />
        <div className="z-10">
          <h1 className=" md:text-xl  text-md uppercase">
            School of Applied Technology
          </h1>
          <h2 className=" text-transparent bg-clip-text bg-gradient-to-l from-[#f6806b] to-[#458cc6] md:text-6xl text-5xl md:px-40 font-bold">
            {"Tomorrow's Developers"}
          </h2>
          <h2 className=" md:text-5xl text-2xl pb-4 md:px-40 px-8 font-[600] text-paragraph">
            Available Today
          </h2>
        </div>
      </section>
    </>
  );
}
