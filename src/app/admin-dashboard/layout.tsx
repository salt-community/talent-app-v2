"use client";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Database, Search, UserCog, UserRound } from "lucide-react";
import Loading from "./loading";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full p-3 sm:p-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        ADMIN DASHBOARD
      </h1>

      <div className="flex overflow-x-auto border-b mb-4 pb-1">
        <Link
          href="/admin-dashboard/developers"
          className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 text-sm md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50 ${
            isActive("/admin-dashboard/developers")
              ? "border-b-2 border-zinc-400"
              : ""
          }`}
        >
          <UserRound className="w-5 h-5" />
          <p>Developers</p>
        </Link>
        <Link
          href="/admin-dashboard/identities"
          className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 text-sm md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50 ${
            isActive("/admin-dashboard/identities")
              ? "border-b-2 border-zinc-400"
              : ""
          }`}
        >
          <UserCog className="w-5 h-5" />
          <p>Identities</p>
        </Link>
        <Link
          href="/admin-dashboard/meilisearch-configuration"
          className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 text-sm md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50 ${
            isActive("/admin-dashboard/meilisearch-configuration")
              ? "border-b-2 border-zinc-400"
              : ""
          }`}
        >
          <Search className="w-5 h-5" />
          <p>Search</p>
        </Link>
        <Link
          href="/admin-dashboard/database"
          className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 text-sm md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50 ${
            isActive("/admin-dashboard/database")
              ? "border-b-2 border-zinc-400"
              : ""
          }`}
        >
          <Database className="w-5 h-5" />
          <p>Database</p>
        </Link>
      </div>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
