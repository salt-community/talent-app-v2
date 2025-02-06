import {
  HighlightPage,
} from "@/features";
import { HighlightedDevelopers } from "@/features";

export default async function Home() {

  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? (
    <>
      <h2>Developer in Focus</h2>
      <h2>Talented, driven, and making a difference.</h2>
      <div className="px-4">
        <HighlightedDevelopers />
      </div>
    </>
  ) : (
    <HighlightPage />
  );
}
