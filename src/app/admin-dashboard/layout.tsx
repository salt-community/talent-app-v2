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
        {tabs.map((tab) => (
          <TabLink key={tab.name} name={tab.name} href={tab.href}>
            {tab.icon}
          </TabLink>
        ))}
      </div>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}

const iconStyle = "w-5 h-5";

const tabs = [
  {
    name: "Developer",
    href: "/admin-dashboard/developers",
    icon: <UserRound className={iconStyle} />,
  },
  {
    name: "Identities",
    href: "/admin-dashboard/identities",
    icon: <UserCog className={iconStyle} />,
  },
  {
    name: "Search",
    href: "/admin-dashboard/meilisearch-configuration",
    icon: <Search className={iconStyle} />,
  },
  {
    name: "Database",
    href: "/admin-dashboard/database",
    icon: <Database className={iconStyle} />,
  },
];
