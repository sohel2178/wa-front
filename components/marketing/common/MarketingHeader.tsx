"use client";

import SyncTemplatesButton from "../SyncTemplatesButton";

interface MarketingHeaderProps {
  onTemplatesSynced: () => void | Promise<void>;
}

export default function MarketingHeader({
  onTemplatesSynced,
}: MarketingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          WhatsApp Template Marketing
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage Meta templates and create WhatsApp marketing campaigns.
        </p>
      </div>

      <SyncTemplatesButton onSuccess={onTemplatesSynced} />
    </div>
  );
}
