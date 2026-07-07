"use client";

import { LayoutTemplate } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemplateEmptyProps {
  search?: string;
  onRefresh?: () => void;
}

export default function TemplateEmpty({
  search = "",
  onRefresh,
}: TemplateEmptyProps) {
  const hasSearch = search.trim().length > 0;

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <LayoutTemplate className="h-10 w-10 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold">
          {hasSearch ? "No templates found" : "No templates available"}
        </h3>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {hasSearch
            ? "Try changing your search or filter to find the template you're looking for."
            : "Synchronize your Meta WhatsApp templates to start creating marketing campaigns."}
        </p>

        {onRefresh && (
          <Button className="mt-6" onClick={onRefresh}>
            Refresh
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
