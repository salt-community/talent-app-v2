import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { H1, H3 } from "../header";

export function Hero() {
  return (
    <>
      <section className="outline h-96 flex flex-col items-center justify-center gap-4 px-4">
        <H1>Salt Talent App</H1>
        <p className="text-paragraph text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum et
          itaque minima.
        </p>
      </section>
      <section className="flex flex-col items-center my-8 gap-4">
        <article className="outline rounded-full w-52 h-52 flex flex-col justify-center items-center p-3">
          <h2 className="text-center text-xl font-bold">
            Best Hack Week Project
          </h2>
          <div className="flex items-center p-2 gap-2">
            <Avatar>
              <AvatarImage className="w-10" src={"./avatar.png"} />
            </Avatar>
            <p className="text-center text-paragraph">Developer name</p>
          </div>
        </article>
        <article className="outline  rounded-full w-52 h-52 flex flex-col justify-center items-center p-3">
          <h2 className="text-center text-xl font-bold">
            Best Final Project
          </h2>
          <div className="flex items-center p-2 gap-2">
            <Avatar>
              <AvatarImage className="w-10" src={"./avatar.png"} />
            </Avatar>
            <p className="text-center text-paragraph">Developer name</p>
          </div>
        </article>
        <article className="outline rounded-full w-52 h-52 flex flex-col justify-center items-center p-3">
          <h2 className="text-center text-xl font-bold">
            Student of the month
          </h2>
          <div className="flex items-center p-2 gap-2">
            <Avatar>
              <AvatarImage className="w-10" src={"./avatar.png"} />
            </Avatar>
            <p className="text-center text-paragraph">Developer name</p>
          </div>
        </article>
      </section>
    </>
  );
}
