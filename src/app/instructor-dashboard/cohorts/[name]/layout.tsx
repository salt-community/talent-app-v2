"use client";

import React, { Suspense } from "react";
import { ArrowLeft, Star } from "lucide-react";
import TabLink from "@/features/admin-dashboard/components/tab-link";
import Loading from "./loading";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
};

export default function InstructorDashboardLayout({
  children,
  params,
}: LayoutProps) {
  const resolvedParams = React.use(params);
  const name = resolvedParams.name;

  return (
    <div className="w-full p-3 sm:p-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        {name.toUpperCase()}
      </h1>
      <div className="flex justify-between items-center border-b mb-4 pb-1">
        <div className="flex overflow-x-auto">
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
        <Link
          href="/instructor-dashboard"
          className="flex items-center gap-1 text-sm mx-4 p-2 md:text-base whitespace-nowrap cursor-pointer hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go back</span>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
