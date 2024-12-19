import { Button } from "@/components";



export function Hero() {
  return (
    <>
      <section className="flex flex-col items-center md:pr-96 justify-center text-center gap-4 md:py-52 py-32 bg-[url('/hero4.png')] bg-cover">
        <h1 className="text-xl uppercase">School of Applied Technology</h1>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-l from-[#f6806b] to-[#458cc6] text-6xl pb-4 px-40 font-bold">
          {"Tomorrow's Developers"}
        </h2>
        <h2 className="text-5xl pb-4 px-40 font-bold">
          Available Today
        </h2>
        <Button>Sign In</Button>
      </section>
    </>
  );
}
