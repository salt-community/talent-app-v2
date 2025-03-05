import { BackgroundAvatar } from "../backgrounds/avatar";

type Props = {
   name: string;
   introduction: string;
   avatarUrl: string;
   hasProfileAccess: boolean;
 };
export function CvHeader({ name, introduction, avatarUrl } : Props) {
  return (
    <article className="flex flex-col items-center md:items-start justify-center gap-4 md:gap-0 md:grid md:grid-cols-[1fr 2fr]">
      <div className="md:col-start-1 md:col-end-2 px-4 h-full">
        <BackgroundAvatar url={avatarUrl} size="lg" />
      </div>
      <div className="flex flex-col items-center gap-4 px-3 md:items-start md:col-start-2 md:col-end-3">
        <h1 className="text-3xl font-bold capitalize">{name}</h1>
        <p className="font-light text-paragraph text-center md:text-left">
          {introduction +
            `I am a self-taught full-stack JavaScript developer
          with a passion for building user-friendly and accessible applications.
          With a background in special education, I bring a unique perspective
          to digital accessibility. I have experience with Next.js, React,
          Express, and PostgreSQL, following best practices like TDD and feature
          slicing. Skilled in collaboration and problem-solving, I enjoy
          creating meaningful applications that make a positive impact.`}
        </p>
      </div>
    </article>
  );
}
