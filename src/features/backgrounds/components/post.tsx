import { H1 } from "@/components";
import Image from "next/image";
import { QuoteHighlight } from "./quote-highlight";

export function Post() {
  return (
    <main className="space-y-4 md:w-10/12 md:mx-auto
    ">
      <Image
        src={"/adrienn.png"}
        alt={"highlightedBackground.title"}
        width={600}
        height={600}
        className=" md:h-80 md:w-auto"
      />
      <QuoteHighlight/>
      <section className="space-y-4 p-3">
        <article className="space-y-2" >
          <div className="space-y-2">
          <H1>Designing for Inclusion in Technology</H1>
          <p className="text-lg  ">
            Exploring the role of accessibility in modern design and how
            inclusive practices shape better user experiences.
          </p>
          </div>

          <h2 className="text-md text-paragraphLight">
            An Interview with Adrienn Pozsgai
          </h2>
        </article>

        <h2 className="text-xl font-bold text-paragraph">What inspired your focus on accessibility in technology?</h2>
        <p className="text-paragraphLight">
         My background in special education played a huge role. I worked
          with individuals with motor disabilities, using tools like
          eye-tracking devices and adaptive communication aids. Seeing how
          technology could empower people ignited my passion for creating
          inclusive, user-friendly applications.
        </p>
        <h2 className="text-xl font-bold text-paragraph">
         How did your experience at SALT impact your approach to
          accessibility?
        </h2>
        <p className="text-paragraphLight">
           SALT’s emphasis on teamwork, especially through mob programming,
          taught me the importance of collaboration. Accessibility is about
          considering diverse perspectives, and that aligns perfectly with the
          inclusive coding practices I learned at SALT. It’s not just about
          writing code—it’s about designing solutions that work for everyone.
        </p>
        <h2 className="text-xl font-bold text-paragraph">
          Why do you think accessibility is essential in modern design?
        </h2>
        <p className="text-paragraphLight">
           Accessibility is not just a feature; it’s a mindset. By designing
          for inclusivity, we make technology usable for all—not just those with
          disabilities but everyone. It’s about removing barriers and ensuring
          that no one is left out. Inclusive practices ultimately lead to better
          user experiences for everyone.
        </p>
        <h2 className="text-xl font-bold text-paragraph"> What message would you share with aspiring developers?</h2>
        <p className="text-paragraphLight">
         Believe in your ability to grow and embrace challenges as
          opportunities. Focus on learning from every experience, and never
          underestimate the impact of inclusive design. It’s a skill that not
          only improves your work but also makes a real difference in people’s
          lives.
        </p>
      </section>
    </main>
  );
}
