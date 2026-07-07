"use client";

import { toast } from "sonner";

import { generateRecipients, uploadCampaignCsv } from "@/lib/marketing-api";

import { TemplateCampaign } from "@/types/template-campaign";

import { useEffect, useState } from "react";

import RecipientTable, {
  CampaignRecipient,
} from "./campaign/recipients/RecipientTable";

import { getCampaignRecipients } from "@/lib/marketing-api";

import CampaignHeader from "./campaign/CampaignHeader";
import CampaignInfoCard from "./campaign/CampaignInfoCard";
import CampaignActions from "./campaign/CampaignActions";
import CampaignStatistics from "./campaign/CampaignStatistics";

import CsvUploadCard from "./import/CsvUploadCard";

import { Card, CardContent } from "@/components/ui/card";
import PreviewCsvDialog from "./import/PreviewCsvDialog";
import CsvReplaceDialog from "./import/CsvReplaceDialog";
import CsvDeleteDialog from "./import/CsvDeleteDialog";
import ImportSummaryCard from "./campaign/statistics/ImportSummaryCard";
import GenerateRecipientsCard from "./campaign/recipients/GenerateRecipientsCard";
import GenerateRecipientsDialog from "./campaign/recipients/GenerateRecipientsDialog";
import RecipientGenerationResult from "./campaign/recipients/RecipientGenerationResult";
import useDebounce from "@/hooks/useDebounce";

import {
  queueCampaign,
  pauseCampaign,
  resumeCampaign,
  cancelCampaign,
} from "@/lib/marketing-api";

interface Props {
  campaign: TemplateCampaign;

  loading?: boolean;

  onRefresh?: () => Promise<void> | void;

  onEdit?: () => void;

  onQueue?: () => void;

  onPause?: () => void;

  onResume?: () => void;

  onCancel?: () => void;

  onDelete?: () => void;
}

export default function CampaignWorkspace({
  campaign,
  loading = false,
  onRefresh,
  onEdit,
  onQueue,
  onPause,
  onResume,
  onCancel,
  onDelete,
}: Props) {
  const [uploadingCsv, setUploadingCsv] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [replaceOpen, setReplaceOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [generateOpen, setGenerateOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [recipientLoading, setRecipientLoading] = useState(false);
  const [recipients, setRecipients] = useState<CampaignRecipient[]>([]);
  const [recipientSearch, setRecipientSearch] = useState("");
  const debouncedRecipientSearch = useDebounce(recipientSearch, 400);
  const [recipientStatus, setRecipientStatus] = useState("all");
  const [recipientPage, setRecipientPage] = useState(1);
  const [recipientPagination, setRecipientPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const [actionLoading, setActionLoading] = useState(false);

  const handleUploadCsv = async (file: File) => {
    try {
      setUploadingCsv(true);

      await uploadCampaignCsv(campaign._id, file);

      toast.success("CSV uploaded successfully.");

      await onRefresh?.();
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message ?? "Failed to upload CSV.");
    } finally {
      setUploadingCsv(false);
    }
  };

  const handleQueueCampaign = async () => {
    try {
      setActionLoading(true);

      await queueCampaign(campaign._id);

      toast.success("Campaign queued successfully.");

      await onRefresh?.();
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message ?? "Failed to queue campaign.");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePauseCampaign = async () => {
    try {
      setActionLoading(true);

      await pauseCampaign(campaign._id);

      toast.success("Campaign paused.");

      await onRefresh?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to pause campaign.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleResumeCampaign = async () => {
    try {
      setActionLoading(true);

      await resumeCampaign(campaign._id);

      toast.success("Campaign resumed.");

      await onRefresh?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to resume campaign.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelCampaign = async () => {
    try {
      setActionLoading(true);

      await cancelCampaign(campaign._id);

      toast.success("Campaign cancelled.");

      await onRefresh?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to cancel campaign.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const loadRecipients = async () => {
    if (!campaign.createdRecipients) {
      setRecipients([]);

      return;
    }

    try {
      setRecipientLoading(true);

      const response = await getCampaignRecipients(campaign._id, {
        page: recipientPage,
        limit: recipientPagination.limit,
        search: recipientSearch,
        status: recipientStatus === "all" ? undefined : recipientStatus,
      });

      setRecipients(response.data);

      setRecipientPagination(response.pagination);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load recipients.");
    } finally {
      setRecipientLoading(false);
    }
  };

  // const handlePreview = () => {
  //   toast.info("CSV Preview will be implemented in Phase 5.");
  // };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  // const handleReplace = () => {
  //   toast.info("Replace CSV dialog will be implemented next.");
  // };

  // const handleDelete = () => {
  //   toast.info("Delete CSV dialog will be implemented next.");
  // };

  const handleGenerateRecipients = async () => {
    try {
      setGenerating(true);

      await generateRecipients(campaign._id);

      toast.success("Recipients generated successfully.");

      setGenerateOpen(false);

      await onRefresh?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to generate recipients.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleReplace = () => {
    setReplaceOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
  };

  console.log("Campaign CSV:", campaign);

  useEffect(() => {
    loadRecipients();
  }, [
    campaign._id,
    campaign.createdRecipients,
    recipientPage,
    debouncedRecipientSearch,
    recipientStatus,
  ]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto space-y-6 p-6">
        {/* Header */}

        <CampaignHeader
          campaign={campaign}
          loading={loading}
          onRefresh={async () => {
            await onRefresh?.();

            await loadRecipients();
          }}
          onEdit={onEdit}
        />

        {/* Main */}

        <div className="grid gap-6 xl:grid-cols-[2fr_380px]">
          {/* Left */}

          <div className="space-y-6">
            <CampaignInfoCard campaign={campaign} />

            <CsvUploadCard
              csvFile={campaign.csvFile}
              uploading={uploadingCsv}
              onUpload={handleUploadCsv}
              onPreview={handlePreview}
              onReplace={handleReplace}
              onDelete={handleDelete}
            />

            {/* <Card>
              <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
                Import Summary Component
              </CardContent>
            </Card> */}

            <ImportSummaryCard summary={campaign.importSummary} />

            <GenerateRecipientsCard
              validRows={campaign.importSummary.validRows}
              generated={campaign.createdRecipients}
              loading={generating}
              onGenerate={() => setGenerateOpen(true)}
            />

            {campaign.createdRecipients && (
              <RecipientGenerationResult
                total={campaign.stats.total}
                onViewRecipients={() => {
                  // We'll implement this in Phase 5.3
                }}
              />
            )}

            {/* <Card>
              <CardContent className="flex h-96 items-center justify-center text-muted-foreground">
                Recipient Table Component
              </CardContent>
            </Card> */}

            {campaign.createdRecipients && (
              <RecipientTable
                recipients={recipients}
                loading={recipientLoading}
                search={recipientSearch}
                status={recipientStatus}
                page={recipientPagination.page}
                totalPages={recipientPagination.totalPages}
                total={recipientPagination.total}
                limit={recipientPagination.limit}
                onSearchChange={(value) => {
                  setRecipientPage(1);
                  setRecipientSearch(value);
                }}
                onStatusChange={(value) => {
                  setRecipientPage(1);
                  setRecipientStatus(value);
                }}
                onPageChange={setRecipientPage}
                onRefresh={loadRecipients}
                onView={(recipient) => console.log(recipient)}
                onDelete={(recipient) => console.log(recipient)}
              />
            )}
          </div>

          {/* Right */}

          <div className="space-y-6">
            <CampaignStatistics campaign={campaign} />

            <CampaignActions
              campaign={campaign}
              loading={loading || actionLoading}
              onQueue={handleQueueCampaign}
              onPause={handlePauseCampaign}
              onResume={handleResumeCampaign}
              onCancel={handleCancelCampaign}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>

      <PreviewCsvDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        campaignId={campaign._id}
      />

      <CsvReplaceDialog
        open={replaceOpen}
        onOpenChange={setReplaceOpen}
        campaignId={campaign._id}
        onSuccess={onRefresh}
      />

      <CsvDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        campaignId={campaign._id}
        onSuccess={onRefresh}
      />

      <GenerateRecipientsDialog
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        total={campaign.importSummary.validRows}
        loading={generating}
        onConfirm={handleGenerateRecipients}
      />
    </div>
  );
}
