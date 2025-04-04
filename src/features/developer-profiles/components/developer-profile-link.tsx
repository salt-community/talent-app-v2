import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  developerSlug: string;
  children: ReactNode;
};

export function DeveloperProfileLink({ developerSlug, children }: Props) {
  return <Link href={`/developers/${developerSlug}`}>{children}</Link>;
}
