import { InterviewCard } from "./interview-card";
export const highlightedDevelopers = [
  {
    id: "1",
    imageUrl: "/victor.png",
    title: "MeiliSearch in Action",
    excerpt:
      "By integrating MeiliSearch into the Talent App, Victor Reyes has transformed how users find information, delivering faster and more accurate search results.",
    avatarUrl: "/avatar.png",
    name: "Victor Reyes",
    date: "Dec 20, 2024",
  },
  {
    id: "2",
    imageUrl: "/adrienn.png",
    title: "Designing for Inclusion in Technology",
    excerpt:
      "Exploring the role of accessibility in modern design and how inclusive practices shape better user experiences.",
    avatarUrl: "/avatar.png",
    name: "Adrienn Pozsgai",
    date: "Dec 20, 2024",
  },
  {
    id: "3",
    imageUrl: "/marten.png",
    title: "Building Access Management from Scratch",
    excerpt:
      "Mårten is tackling the challenge of creating a secure and logical access system while helping bring the Talent App to life from the ground up.",
    avatarUrl: "/avatar.png",
    name: "Mårten Söderlind",
    date: "Dec 20, 2024",
  },
];

export function Posts() {
  return (
    <section className="bg-secondary pb-14">
      <h2 className="text-center text-4xl font-semibold py-14">
        Our Developers in Focus
      </h2>
      <article className="flex flex-wrap gap-10 justify-center">
        {highlightedDevelopers.map((developer) => {
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
