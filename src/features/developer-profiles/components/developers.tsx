import { CvInfo } from "../types";
import { DeveloperCard } from "./developer-card";

type Props = {
  developerProfiles: (CvInfo)[];
};

export async function Developers({ developerProfiles }: Props) {
  return (
    <ul className="pt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {developerProfiles.map((developerProfile, index) => (
        <DeveloperCard key={index} developerProfile={developerProfile} />
      ))}
    </ul>
  );
}
