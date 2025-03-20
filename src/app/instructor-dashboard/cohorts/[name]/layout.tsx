"use client";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import TabLink from "@/features/admin-dashboard/components/tab-link";
import Loading from "@/app/admin-dashboard/loading";

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

  const getActiveTab = () => {
    const normalizedPath = normalizePath(pathname);
    if (normalizedPath.endsWith("/developers")) return "Developers";
    if (normalizedPath === `/instructor-dashboard/cohorts/${name}`)
      return "Assignments";
    return "";
  };

  return (
    <div className="w-full p-3 sm:p-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        {name.toUpperCase()}
      </h1>

      <div className="flex overflow-x-auto border-b mb-4 pb-1">
        <TabLink
          name="Assignments"
          href={`/instructor-dashboard/cohorts/${name}`}
        >
          <Star className="w-5 h-5" />
        </TabLink>
        <TabLink
          name="Developers"
          href={`/instructor-dashboard/cohorts/${name}/developers`}
        >
          <Star className="w-5 h-5" />
        </TabLink>
      </div>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
