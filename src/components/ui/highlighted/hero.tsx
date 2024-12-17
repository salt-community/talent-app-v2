import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { H1, H3 } from "../header";

export function Hero() {
  return (
    <>
      <section className=" h-96 flex flex-col items-center justify-center gap-4 px-4">
        <H1>Salt Talent App</H1>
        <p className="text-paragraph text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum et
          itaque minima.
        </p>
      </section>
    </>
  );
}
