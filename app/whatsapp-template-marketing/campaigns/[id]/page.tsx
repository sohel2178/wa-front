"use client";

import { useCallback, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

import CampaignWorkspace from "@/components/marketing/campaigns/CampaignWorkspace";

import { TemplateCampaign } from "@/types/template-campaign";

import { getCampaign } from "@/lib/marketing-api";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

export default function CampaignDetailsPage() {
  const params = useParams();

  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<TemplateCampaign | null>(null);

  const [loading, setLoading] = useState(true);

  const loadCampaign = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getCampaign(campaignId);

      setCampaign(result);
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message ?? "Failed to load campaign.");
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId, loadCampaign]);

  return (
    <ProtectedRoute>
      <MainLayout>
        {loading ? (
          <div className="flex h-[70vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !campaign ? (
          <div className="flex h-[70vh] items-center justify-center text-muted-foreground">
            Campaign not found.
          </div>
        ) : (
          <div className="h-screen flex-1 overflow-hidden">
            <CampaignWorkspace
              campaign={campaign}
              loading={loading}
              onRefresh={loadCampaign}
            />
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}
