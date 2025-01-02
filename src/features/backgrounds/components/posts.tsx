import { errorHandler } from "@/lib";
import { HighlightedDeveloper } from "../db/posts-data";
import { backgroundsService } from "../instance";
import { InterviewCard } from "./interview-card";

export async function Posts() {
  let posts: HighlightedDeveloper[] = [];
  
  try {
    posts = await backgroundsService.getAllPosts();
  } catch (error) {
    errorHandler(error);
  } 
  
  return (
    <section className="bg-secondary pb-14">
      <h2 className="text-center text-4xl font-semibold py-14">
        Our Developers in Focus
      </h2>
      <article className="flex flex-wrap gap-10 justify-center">
        {posts.map((developer) => {
          return (
            <InterviewCard
              key={developer.id}
              highlightedBackground={developer}
            />
          );
        })}
      </article>
    </section>
  );
}
