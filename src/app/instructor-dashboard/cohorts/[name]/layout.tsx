"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const resolvedParams = React.use(params);
  const name = resolvedParams.name;

  const tabs = [
    {
      name: "Assignments",
      icon: <Star className="w-4 h-4" />,
      href: `/instructor-dashboard/cohorts/${name}/`,
    },
    {
      name: "Developers",
      icon: <Users className="w-4 h-4" />,
      href: `/instructor-dashboard/cohorts/${name}/developers`,
    },
  ];

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href, { scroll: false });
  };

  return (
    <div className="flex flex-col w-full p-28">
      <h1 className="text-2xl font-bold p-4">{name.toUpperCase()}</h1>

      <nav className="flex border-b">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={(e) => handleNavigation(tab.href, e)}
            className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
              pathname.includes(tab.name.toLowerCase())
                ? "border-b-2 border-red-500"
                : ""
            }`}
          >
            {tab.icon}
            {tab.name}
          </a>
        ))}
      </nav>

      <main className="p-4">{children}</main>
    </div>
  );
}
