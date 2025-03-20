"use client";
import React, { Suspense } from "react";
import { Database, Search, UserCog, UserRound } from "lucide-react";
import Loading from "./loading";
import TabLink from "@/features/admin-dashboard/components/tab-link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-3 sm:p-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        ADMIN DASHBOARD
      </h1>

      <div className="flex overflow-x-auto border-b mb-4 pb-1">
        <TabLink name="Developer" href="/admin-dashboard/developers">
          <UserRound className="w-5 h-5" />
        </TabLink>
        <TabLink name="Identities" href="/admin-dashboard/identities">
          <UserCog className="w-5 h-5" />
        </TabLink>
        <TabLink
          name="Search"
          href="/admin-dashboard/meilisearch-configuration"
        >
          <Search className="w-5 h-5" />
        </TabLink>
        <TabLink name="Database" href="/admin-dashboard/database">
          <Database className="w-5 h-5" />
        </TabLink>
      </div>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
