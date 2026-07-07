"use client";

import RecipientToolbar from "./RecipientToolbar";
import RecipientSkeleton from "./RecipientSkeleton";
import RecipientEmpty from "./RecipientEmpty";
import RecipientRow from "./RecipientRow";
import RecipientPagination from "./RecipientPagination";

import { RecipientStatus } from "./RecipientStatusBadge";

export interface CampaignRecipient {
  _id: string;

  phone: string;

  name?: string;

  status: RecipientStatus;

  assignedEmployee?: {
    _id: string;

    name: string;
  };

  createdAt: string;
}

interface Props {
  recipients: CampaignRecipient[];

  loading: boolean;

  search: string;

  status: string;

  page: number;

  totalPages: number;

  total: number;

  limit: number;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onPageChange: (page: number) => void;

  onRefresh: () => void;

  onView?: (recipient: CampaignRecipient) => void;

  onDelete?: (recipient: CampaignRecipient) => void;
}

export default function RecipientTable({
  recipients,
  loading,

  search,
  status,

  page,
  totalPages,
  total,
  limit,

  onSearchChange,
  onStatusChange,
  onPageChange,
  onRefresh,

  onView,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4">
      <RecipientToolbar
        search={search}
        status={status}
        loading={loading}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onRefresh={onRefresh}
      />

      {loading ? (
        <RecipientSkeleton />
      ) : recipients.length === 0 ? (
        <RecipientEmpty search={search.length > 0} />
      ) : (
        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Recipient</th>

                <th className="px-6 py-4 text-left font-medium">Employee</th>

                <th className="px-6 py-4 text-left font-medium">Status</th>

                <th className="px-6 py-4 text-left font-medium">Created</th>

                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recipients.map((recipient) => (
                <RecipientRow
                  key={recipient._id}
                  recipient={recipient}
                  onView={() => onView?.(recipient)}
                  onDelete={() => onDelete?.(recipient)}
                />
              ))}
            </tbody>
          </table>

          <RecipientPagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            loading={loading}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
