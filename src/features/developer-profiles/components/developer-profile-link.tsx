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
  const { slug } =
    await developerProfilesService.getDeveloperById(developerProfileId);

  return <Link href={`/developers/${slug}`}>{children}</Link>;
}
