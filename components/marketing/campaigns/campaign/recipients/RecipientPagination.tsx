"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;

  totalPages: number;

  total: number;

  limit: number;

  loading?: boolean;

  onPageChange: (page: number) => void;
}

export default function RecipientPagination({
  page,
  totalPages,
  total,
  limit,
  loading = false,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 border-t px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}</span> to{" "}
        <span className="font-medium text-foreground">{end}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> recipients
      </p>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          disabled={loading || page === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={loading || page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-24 text-center text-sm font-medium">
          Page {page} / {totalPages}
        </div>

        <Button
          size="icon"
          variant="outline"
          disabled={loading || page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={loading || page === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
