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
      <HeroPost name={post.name} headline={post.headline} />
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
