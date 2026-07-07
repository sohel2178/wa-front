"use client";

import { MoreHorizontal, Phone, User } from "lucide-react";
import { format } from "date-fns";

import RecipientStatusBadge, { RecipientStatus } from "./RecipientStatusBadge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface Recipient {
  _id: string;

  phone: string;

  name?: string;

  status: RecipientStatus;

  assignedEmployee?: {
    name: string;
  };

  createdAt: string;
}

interface Props {
  recipient: Recipient;

  onView?: () => void;

  onDelete?: () => void;
}

export default function RecipientRow({ recipient, onView, onDelete }: Props) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/40">
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-medium">
            <Phone className="h-4 w-4 text-muted-foreground" />
            {recipient.phone}
          </div>

          {recipient.name && (
            <p className="text-sm text-muted-foreground">{recipient.name}</p>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />

          {recipient.assignedEmployee?.name ?? "-"}
        </div>
      </td>

      <td className="px-6 py-4">
        <RecipientStatusBadge status={recipient.status} />
      </td>

      <td className="px-6 py-4 text-sm text-muted-foreground">
        {format(new Date(recipient.createdAt), "dd MMM yyyy HH:mm")}
      </td>

      <td className="px-6 py-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>

            <DropdownMenuItem className="text-destructive" onClick={onDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
