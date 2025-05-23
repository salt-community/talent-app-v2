"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, MessageCircle } from "lucide-react";
import { ReactNode, useState } from "react";

interface FixedTabsProps {
  feedbackContent: ReactNode;
  fixListContent: ReactNode;
  fixCount: number;
  defaultTab?: "feedback" | "fixlist";
}

export default function AssignmentTabs({
  feedbackContent,
  fixListContent,
  fixCount = 0,
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
          className="!rounded-button whitespace-nowrap data-[state=active]:bg-background"
        >
          <MessageCircle className="mr-2 cursor-pointer" size={16} />
          <span className="cursor-pointer">Feedback</span>
        </TabsTrigger>
        <TabsTrigger
          value="fixlist"
          className="!rounded-button whitespace-nowrap data-[state=active]:bg-background "
        >
          <List className="mr-2 cursor-pointer" size={16} />

          <span className="cursor-pointer">Fix List {fixCount | 0}</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="feedback">{feedbackContent}</TabsContent>

      <TabsContent value="fixlist">{fixListContent}</TabsContent>
    </Tabs>
  );
}
