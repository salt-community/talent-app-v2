"use client";
import React, { useState } from "react";
import { TabType } from "../types";

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface ScoringTabProps {
  tabs: TabItem[];
  defaultTab?: TabType;
  feedbackContent?: React.ReactNode;
  fixListContent?: React.ReactNode;
}

export function AssignmentTabs({
  tabs,
  defaultTab = "feedback",
  feedbackContent,
  fixListContent,
}: ScoringTabProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feedback":
        return feedbackContent;
      case "fixList":
        return fixListContent;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex items-center justify-center rounded-lg px-2 py-1 border border-gray-200 max-w-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center  px-3 py-1 text-sm cursor-pointer rounded-md transition-colors ${
                activeTab === tab.id
                  ? "font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {React.cloneElement(tab.icon as React.ReactElement, {
                fill: activeTab === tab.id ? "currentColor" : "none",
                className: "w-8 h-4",
              })}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 bg-gray-200 text-gray-700 text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </>
  );
}
