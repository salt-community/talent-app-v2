import {
  HighlightPage,
} from "@/features";
import { HighlightedDevelopers } from "@/features";
import { Hero } from "@/features/backgrounds/components/hero";

export default async function Home() {

  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? (
    <div className="bg-zinc-50">
    <Hero/>
      <h2 className="text-center text-4xl font-extrabold pt-16 text-header">Developers in Focus</h2>
      <h3 className="text-center text-lg pt-4 text-paragraphLight px-1">
        Each developer has a unique story, skill set, and impact on the tech
        world. Meet a standout talent and explore their journey
      </h3>
      <div className="px-4 pb-12">
        <HighlightedDevelopers />
      </div>
    </div>
  ) : (
    <HighlightPage />
  );
}
