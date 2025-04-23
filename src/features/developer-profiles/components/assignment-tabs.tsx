"use client";
import React, { useState, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clipboard, MessageSquare } from "lucide-react";

interface FixedTabsProps {
  feedbackContent: ReactNode;

  fixListContent: ReactNode;
  defaultTab?: "feedback" | "fixlist";
}

export default function AssignmentTabs({
  feedbackContent,
  fixListContent,
  defaultTab = "feedback",
}: FixedTabsProps) {
  const [activeTab, setActiveTab] = useState<"feedback" | "fixlist">(
    defaultTab
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "feedback" | "fixlist")}
    >
      <TabsList className="mb-4 bg-muted/50 p-1">
        <TabsTrigger
          value="feedback"
          className="!rounded-button whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <MessageSquare className="mr-2" size={16} />
          Feedback
        </TabsTrigger>
        <TabsTrigger
          value="fixlist"
          className="!rounded-button whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Clipboard className="mr-2" size={16} />
          Fix List
        </TabsTrigger>
      </TabsList>
      <TabsContent value="feedback">{feedbackContent}</TabsContent>

      <TabsContent value="fixlist">{fixListContent}</TabsContent>
    </Tabs>
  );
}
