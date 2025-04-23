"use client";
import React, { useState, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clipboard, MessageSquare } from "lucide-react";

interface FixedTabsProps {
  fixListContent: ReactNode;
  feedbackContent: ReactNode;
  defaultTab?: "fixlist" | "feedback";
}

export default function FixedTabs({
  fixListContent,
  feedbackContent,
  defaultTab = "fixlist",
}: FixedTabsProps) {
  const [activeTab, setActiveTab] = useState<"fixlist" | "feedback">(
    defaultTab
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "fixlist" | "feedback")}
    >
      <TabsList className="mb-4 bg-muted/50 p-1">
        <TabsTrigger
          value="fixlist"
          className="!rounded-button whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Clipboard className="mr-2" size={16} />
          Fix List
        </TabsTrigger>
        <TabsTrigger
          value="feedback"
          className="!rounded-button whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <MessageSquare className="mr-2" size={16} />
          Feedback
        </TabsTrigger>
      </TabsList>

      <TabsContent value="fixlist">{fixListContent}</TabsContent>

      <TabsContent value="feedback">{feedbackContent}</TabsContent>
    </Tabs>
  );
}
