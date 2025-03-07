"use client";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Database, Search, UserCog, UserRound } from "lucide-react";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Developers",
      icon: <UserRound className="w-5 h-5" />,
      href: "/admin-dashboard/developers",
    },
    {
      name: "Identities",
      icon: <UserCog className="w-5 h-5" />,
      href: "/admin-dashboard/identities",
    },
    {
      name: "Search",
      icon: <Search className="w-5 h-5" />,
      href: "/admin-dashboard/meilisearch-configuration",
    },
    {
      name: "Database",
      icon: <Database className="w-5 h-5" />,
      href: "/admin-dashboard/database",
    },
  ];

  const getActiveTab = () => {
    const normalizedPath = pathname;
    for (const tab of tabs) {
      if (normalizedPath === tab.href) return tab.name;
    }
    return "";
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-full p-4 md:px-32">
      <h1 className="text-2xl font-bold mb-4">ADMIN DASHBOARD</h1>
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:cursor-pointer ${
              activeTab === tab.name ? "border-b-2 border-zinc-400" : ""
            }`}
          >
            {tab.icon}
            {tab.name}
          </a>
        ))}
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
