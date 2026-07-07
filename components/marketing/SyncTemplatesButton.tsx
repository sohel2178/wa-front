"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { syncTemplates } from "@/lib/marketing-api";

interface SyncTemplatesButtonProps {
  onSuccess?: () => void;
}

export default function SyncTemplatesButton({
  onSuccess,
}: SyncTemplatesButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    try {
      setLoading(true);

      const result = await syncTemplates();

      toast.success(result.message || "Templates synchronized successfully.");

      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to synchronize templates.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSync} disabled={loading}>
      <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />

      {loading ? "Synchronizing..." : "Sync Templates"}
    </Button>
  );
}
