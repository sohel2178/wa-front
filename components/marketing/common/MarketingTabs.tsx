"use client";

import { LayoutTemplate, Megaphone } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type MarketingTab = "templates" | "campaigns";

interface MarketingTabsProps {
  selectedTab: MarketingTab;

  onTabChange: (tab: MarketingTab) => void;
}

export default function MarketingTabs({
  selectedTab,
  onTabChange,
}: MarketingTabsProps) {
  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => onTabChange(value as MarketingTab)}
    >
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Templates
        </TabsTrigger>

        <TabsTrigger value="campaigns" className="flex items-center gap-2">
          <Megaphone className="h-4 w-4" />
          Campaigns
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
