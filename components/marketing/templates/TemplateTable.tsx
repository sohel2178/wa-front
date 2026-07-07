"use client";

import { MetaTemplate } from "@/types/meta-template";

import TemplateToolbar from "./TemplateToolbar";
import TemplateRow from "./TemplateRow";
import TemplateEmpty from "./TemplateEmpty";
import TemplateSkeleton from "./TemplateSkeleton";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TemplateTableProps {
  templates: MetaTemplate[];

  loading: boolean;

  search: string;

  status: string;

  pagination: Pagination;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onPageChange: (page: number) => void;

  onRefresh?: () => void;
  onView?: (template: MetaTemplate) => void;
}

export default function TemplateTable({
  templates,
  loading,
  search,
  status,
  pagination,
  onSearchChange,
  onStatusChange,
  onPageChange,
  onRefresh,
  onView,
}: TemplateTableProps) {
  return (
    <div className="space-y-4">
      <TemplateToolbar
        search={search}
        status={status}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
      />

      {loading ? (
        <TemplateSkeleton />
      ) : templates.length === 0 ? (
        <TemplateEmpty search={search} onRefresh={onRefresh} />
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Template
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Language
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Quality
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Last Sync
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {templates.map((template) => (
                    <TemplateRow
                      key={template._id}
                      template={template}
                      onView={onView}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
              <div className="text-sm text-muted-foreground">
                Showing {(pagination.page - 1) * pagination.limit + 1}
                {" - "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}
                {" of "}
                {pagination.total} templates
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={pagination.page === 1}
                  onClick={() => onPageChange(pagination.page - 1)}
                >
                  Previous
                </button>

                <span className="px-3 text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => onPageChange(pagination.page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
