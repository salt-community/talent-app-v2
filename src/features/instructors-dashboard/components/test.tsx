"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  name: string;
  assignmentsLength: number;
  developersLength: number;
};

export default function InstructorDashboardNavbar({
  name,
  assignmentsLength,
  developersLength,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    {
      name: "Assignments",
      count: assignmentsLength,
      icon: "⭐",
      href: `/instructor-dashboard/cohorts/${name}/`,
    },
    {
      name: "Developers",
      count: developersLength,
      icon: "👥",
      href: `/instructor-dashboard/cohorts/${name}/developers`,
    },
  ];

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href, { scroll: false });
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold mb-2">{name.toUpperCase()}</h1>
      <div className="flex border-b">
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
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
            {typeof tab.count === "number" && (
              <span className="ml-1 text-gray-600">{tab.count}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
