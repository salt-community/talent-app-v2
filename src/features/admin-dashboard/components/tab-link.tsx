import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  href: string;
  children: React.ReactNode;
};

export default function TabLink({ name, href, children }: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <Link
      href={href}
      className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 text-sm md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50 ${
        isActive(href) ? "border-b-2 border-zinc-400" : ""
      }`}
    >
      {children}
      <p>{name}</p>
    </Link>
  );
}
