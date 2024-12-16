import { H1, H2 } from "../header";

export function Hero() {
  return (
    <section className="outline h-96 flex flex-col items-center justify-center gap-4 px-4">
      <H1>Salt Talent App</H1>
      <p className="text-paragraph text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum et
        itaque minima.
      </p>
    </section>
  );
}
