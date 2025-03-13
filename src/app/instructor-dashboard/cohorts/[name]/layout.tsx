"use client";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Star, Users } from "lucide-react";
import Loading from "@/app/loading";

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

  const normalizePath = (path: string) => path.replace(/\/$/, "");

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
    <div className="w-full p-3 sm:p-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        {name.toUpperCase()}
      </h1>

      <div className="flex overflow-x-auto border-b mb-4 pb-1">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className={`px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 text-sm md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50 ${
              activeTab === tab.name ? "border-b-2 border-zinc-400" : ""
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </a>
        ))}
      </div>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
