"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Star, Users } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
};

export default function DeveloperDashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const name = "Developer Dashboard";

  const normalizePath = (path: string) => path.replace(/\/$/, "");

  const tabs = [
    {
      name: "Assignments",
      icon: <Star className="w-5 h-5" />,
      href: `/developer-dashboard/assignments`,
    },
    {
      name: "Profiles",
      icon: <Users className="w-5 h-5" />,
      href: `/developer-dashboard/profiles`,
    },
  ];
  const getActiveTab = () => {
    const normalizedPath = normalizePath(pathname);

    if (normalizedPath.endsWith("/profiles")) return "Profiles";
    if (normalizedPath === `/developer-dashboard/assignments`)
      return "Assignments";

    return "";
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-full p-4 md:px-32 ">
      <h1 className="text-2xl font-bold mb-4">{name.toUpperCase()}</h1>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
              activeTab === tab.name ? "border-b-2 border-zinc-400" : ""
            }`}
          >
            {tab.icon}
            {tab.name}
          </a>
        ))}
      </div>
      {children}
    </div>
  );
}
