import Link from "next/link";
import { developerProfilesService } from "../instance";

type Props = {
  developerProfileId: string;
  children: React.ReactNode;
};

export async function DeveloperProfileLink({
  developerProfileId,
  children,
}: Props) {
  const developer =
    await developerProfilesService.getDeveloperById(developerProfileId);
  if (developer) {
    unde;
    return <Link href={`/developers/${developer.slug}`}>{children}</Link>;
  }
}
