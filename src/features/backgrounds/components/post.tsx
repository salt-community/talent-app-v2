import Image from "next/image";
import { QuoteHighlight } from "./quote-highlight";
import { HeroPost } from "./hero-post";
import { backgroundsService } from "../instance";

export async function Post({ developerId }: { developerId: string }) {
  const post = await backgroundsService.getPostById(developerId);
  if (!post) {
    return null;
  }
  return (
    <main
      className="space-y-4 md:w-10/12 md:mx-auto p-3
    "
    >
      <HeroPost name={post.name} headline={post.headline}/>
      <QuoteHighlight />
      <section className="space-y-4">
        <article className="flex items-start">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-paragraph leading-none">
              {post.title}
            </h2>
            <p className="text-sm text-paragraphLight">{post.excerpt}</p>
          </div>
          <Image
            src={post.imageUrl}
            alt={post.name}
            width={200}
            height={200}
            className="object-cover h-52 w-52 md:h-80 md:w-auto"
          />
        </article>

        <h2 className="text-xl font-bold text-paragraph">
          What inspired your focus on accessibility in technology?
        </h2>
        <p className="text-paragraphLight">
          My background in special education played a huge role. I worked with
          individuals with motor disabilities, using tools like eye-tracking
          devices and adaptive communication aids. Seeing how technology could
          empower people ignited my passion for creating inclusive,
          user-friendly applications.
        </p>
        <h2 className="text-xl font-bold text-paragraph">
          How did your experience at SALT impact your approach to accessibility?
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
          Accessibility is not just a feature; it’s a mindset. By designing for
          inclusivity, we make technology usable for all—not just those with
          disabilities but everyone. It’s about removing barriers and ensuring
          that no one is left out. Inclusive practices ultimately lead to better
          user experiences for everyone.
        </p>
        <h2 className="text-xl font-bold text-paragraph">
          {" "}
          What message would you share with aspiring developers?
        </h2>
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
