import Image from "next/image";
import { QuoteHighlight } from "./quote-highlight";
import { HeroPost } from "./hero-post";
import { backgroundsService } from "../instance";
import type { HighlightedDeveloper } from "../db/posts-data";
import { errorHandler } from "@/lib";

export async function Post({ developerId }: { developerId: string }) {
  let post: HighlightedDeveloper | undefined;

  try {
    post = await backgroundsService.getPostById(developerId);
  } catch (error) {
      errorHandler(error);
  }

  if (!post) {
    return null;
  }
  return (
    <main
      className="space-y-4 md:mx-auto
    "
    >
      <HeroPost name={post.name} headline={post.headline} />
      <QuoteHighlight />
      <section className="space-y-4 p-3 md:px-16 lg:px-32">
        <Image
          src={post.imageUrl}
          alt={post.name}
          width={200}
          height={200}
          className="object-cover float-right h-52 w-52 ml-4 md:h-80 md:w-auto lg:h-96 lg:ml-16 lg:mb-2"
        />
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-header leading-none md:text-4xl">
            {post.title}
          </h2>
          <p className="text-sm md:text-base text-paragraphLight pb-4">
            {post.excerpt}
          </p>
        </div>
        {post.questions.map((question) => {
          return (
            <article key={question.id}>
              <h2 className="text-xl font-bold text-paragraph">
                {question.question}
              </h2>
              <p className="text-paragraphLight">{question.answer}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
