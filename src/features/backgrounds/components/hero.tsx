import { Button } from "@/components";



export function Hero() {
  return (
    <>
      <section className="flex flex-col items-center pr-64 justify-center gap-4 py-52 bg-[url('/hero.jpg')] bg-cover bg-center">
        <h1 className="text-xl uppercase">School of Applied Technology</h1>
        <h2 className="text-paragraph text-6xl pb-4 px-40 font-bold">
          {"Tomorrow's Developers."}
        </h2>
        <h2 className="text-paragraph text-6xl pb-4 px-40 font-bold">
          Available Today.
        </h2>
        <h3 className="text-2xl pb-4">
          Learn more about risk free recruitment
        </h3>
        <Button>Sign In</Button>
      </section>
    </>
  );
}
