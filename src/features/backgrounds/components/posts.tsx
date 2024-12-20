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
  avatarUrl: "/avatar.png",
  name: "Sophia Carter",
  date: "Dec 18, 2024",
};
const ali = {
  imageUrl: "/ali-avatar.png",
  title: "Building the Future of Web Applications",
  excerpt:
    "Bridging frontend and backend with simplicity, performance, and maintainability. Explore how Ali crafts seamless digital experiences.",
  avatarUrl: "/ali-avatar.png",
  name: "Ali Mohseni",
  date: "Dec 18, 2024",
};

export function Posts() {
  return (
    <section className="bg-secondary pb-14">
      <h2 className="text-center text-4xl font-semibold py-14">Developers</h2>
      <article className="flex flex-wrap gap-10 justify-center">
        <InterviewCard highlightedBackground={meiliSearch} />
        <InterviewCard highlightedBackground={sophia} />
        <InterviewCard highlightedBackground={ali} />
      </article>
    </section>
  );
}
