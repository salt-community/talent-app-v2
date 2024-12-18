import { InterviewCard } from "./interview-card";
const meiliSearch = {
  imageUrl: "/man.jpg",
  title: "MeiliSearch in Action",
  excerpt:
    "Implementing MeiliSearch in the Talent App improved search speed and relevance.",
  avatarUrl: "/avatar.png",
  name: "Victor Kings",
  date: "Sep 1, 2021",
};

const sophia = {
  imageUrl: "/post.jpg",
  title: "Meet the Leader Behind Success",
  excerpt:
    "Empowering teams and driving innovation. Discover the journey of resilience and vision that redefines leadership.",
  avatarUrl: "/woman-avatar.png",
  name: "Sophia Carter",
  date: "Dec 18, 2024",
};


export function Posts() {
  return (
    <article className="flex flex-wrap gap-5 justify-center">
      <InterviewCard highlightedBackground={meiliSearch}/>
      <InterviewCard highlightedBackground={sophia} />
    </article>
  );
}