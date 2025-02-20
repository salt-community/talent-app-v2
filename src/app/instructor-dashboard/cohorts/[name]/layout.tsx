"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Users } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
};

export default function InstructorDashboardLayout({
  children,
  params,
}: LayoutProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const name = resolvedParams.name;

  const [activeTab, setActiveTab] = useState("Assignments");

  const tabs = [
    {
      name: "Assignments",
      icon: <Star className="w-5 h-5" />,
      href: `/instructor-dashboard/cohorts/${name}/`,
    },
    {
      name: "Developers",
      icon: <Users className="w-5 h-5" />,
      href: `/instructor-dashboard/cohorts/${name}/developers`,
    },
  ];

  const handleNavigation = (
    tabName: string,
    href: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setActiveTab(tabName);
    router.push(href, { scroll: false });
  };

  return (
    <div className="w-full p-24">
      <h1 className="text-2xl font-bold mb-4">{name.toUpperCase()}</h1>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={(e) => handleNavigation(tab.name, tab.href, e)}
            className={`px-4 py-2 flex items-center gap-2 cursor-pointer ${
              activeTab === tab.name ? "border-b-2 border-red-500" : ""
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
