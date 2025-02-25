"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    { name: "Developers", href: "/admin/developers" },
    { name: "Identities", href: "/admin/identities" },
    { name: "Search", href: "/admin/meilisearch-configuration" },
    { name: "Database", href: "/admin/database" },
  ];

  return (
    <div className="container mx-auto flex flex-col justify-center px-4 py-8 gap-4">
      <div className="md:flex md:justify-between">
        <h1 className="text-3xl font-bold">Admin</h1>
        <div className="flex py-1 px-1 bg-gray-200 rounded-md justify-between mt-2 md:mt-0">
          {navItems.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={`py-1 px-4 rounded-md ${
                pathname === href
                  ? "bg-black text-white"
                  : "text-paragraphLight hover:bg-gray-300"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
