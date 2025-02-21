"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Star, Users } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
};

export default function InstructorDashboardLayout({
  children,
  params,
}: LayoutProps) {
  const pathname = usePathname();
  const resolvedParams = React.use(params);
  const name = resolvedParams.name;

  const normalizePath = (path: string) => path.replace(/\/$/, ""); // Tar bort trailing slash

  const tabs = [
    {
      name: "Assignments",
      icon: <Star className="w-5 h-5" />,
      href: `/instructor-dashboard/cohorts/${name}`,
    },
    {
      name: "Developers",
      icon: <Users className="w-5 h-5" />,
      href: `/instructor-dashboard/cohorts/${name}/developers`,
    },
  ];

  const getActiveTab = () => {
    const normalizedPath = normalizePath(pathname);

    if (normalizedPath.endsWith("/developers")) return "Developers";
    if (normalizedPath === `/instructor-dashboard/cohorts/${name}`)
      return "Assignments";

    return "";
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-full p-36">
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
