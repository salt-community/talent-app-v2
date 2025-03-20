"use client";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Star, Users } from "lucide-react";
import Loading from "./loading";
import TabLink from "@/features/admin-dashboard/components/tab-link";

type LayoutProps = {
  children: React.ReactNode;
  params?: Promise<{ name: string }>;
};

export default function DeveloperDashboardLayout({ children }: LayoutProps) {
  return (
    <div className="w-full p-3 sm:p-4 md:px-8 lg:px-10 xl:px-32">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        DEVELOPER DASHBOARD
      </h1>

      <div className="flex overflow-x-auto border-b mb-4 pb-1">
        <TabLink name="Assignments" href="/developer-dashboard/assignments">
          <Star className="w-5 h-5" />
        </TabLink>
        <TabLink name="Profiles" href="/developer-dashboard/profiles">
          <Users className="w-5 h-5" />
        </TabLink>
      </div>

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
