import { HighlightPage } from "@/features";

export default async function Home() {
  return process.env.FF_NEW_HIGHLIGHTS === "ON" ? <></> : <HighlightPage />;
}
