"use client";

import CampaignToolbar from "./CampaignToolbar";
import CampaignEmpty from "./CampaignEmpty";
import CampaignSkeleton from "./CampaignSkeleton";

import { TemplateCampaign } from "@/types/template-campaign";
import CampaignRow from "./CampaignRow";

interface Props {
  campaigns: TemplateCampaign[];

  loading: boolean;

  search: string;

  onSearchChange: (value: string) => void;

  onCreate: () => void;

  onView?: (campaign: TemplateCampaign) => void;
  onDelete?: (campaign: TemplateCampaign) => void;
}

export default function CampaignTable({
  campaigns,
  loading,
  search,
  onSearchChange,
  onCreate,
  onView,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4">
      <CampaignToolbar
        search={search}
        onSearchChange={onSearchChange}
        onCreate={onCreate}
      />

      {loading ? (
        <CampaignSkeleton />
      ) : campaigns.length === 0 ? (
        <CampaignEmpty onCreate={onCreate} />
      ) : (
        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-6 py-4 text-left">Campaign</th>

                <th className="px-6 py-4 text-left">Template</th>

                <th className="px-6 py-4 text-left">Employee</th>

                <th className="px-6 py-4 text-left">Recipients</th>

                <th className="px-6 py-4 text-left">Progress</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((campaign) => (
                <CampaignRow
                  key={campaign._id}
                  campaign={campaign}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
