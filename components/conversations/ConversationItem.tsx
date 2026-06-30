"use client";

import { Badge } from "@/components/ui/badge";
import { Conversation } from "@/types/conversation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreVertical,
  Tags,
  UserPlus,
  Pin,
  Archive,
  CalendarClock,
} from "lucide-react";

type Props = {
  conversation: Conversation;
  selected?: boolean;

  onClick: () => void;

  onAssignLabels: (conversation: Conversation) => void;

  onAssignEmployee: (conversation: Conversation) => void;

  onPin?: (conversation: Conversation) => void;

  onArchive?: (conversation: Conversation) => void;
};

export default function ConversationItem({
  conversation,
  selected,
  onClick,
  onAssignLabels,
  onAssignEmployee,
  onPin,
  onArchive,
}: Props) {
  const labels = conversation.labels || [];

  const followUp = conversation.followUp;

  const now = new Date();

  const getFollowUpBadge = () => {
    if (!followUp?.current) {
      return null;
    }

    const { status, scheduledAt } = followUp.current;

    if (status === "completed") {
      return {
        text: "Completed",
        variant: "default" as const,
      };
    }

    if (status === "cancelled") {
      return {
        text: "Cancelled",
        variant: "secondary" as const,
      };
    }

    if (!scheduledAt) {
      return null;
    }

    const scheduled = new Date(scheduledAt);

    const now = new Date();

    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    if (scheduled < now) {
      return {
        text: "Overdue",
        variant: "destructive" as const,
      };
    }

    if (scheduled >= start && scheduled <= end) {
      return {
        text: "Today",
        variant: "default" as const,
      };
    }

    return {
      text: scheduled.toLocaleDateString(),
      variant: "secondary" as const,
    };
  };

  const followUpBadge = getFollowUpBadge();

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        border-b
        px-3
        py-2
        hover:bg-muted
        transition-colors
        ${selected ? "bg-muted" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm truncate">
            {conversation.contactId?.name}
          </div>

          <div className="text-[11px] text-muted-foreground truncate">
            {conversation.contactId?.phone}
          </div>

          {conversation.assignedTo && (
            <div className="text-[10px] text-blue-600 mt-0.5 truncate">
              Assigned: {conversation.assignedTo.name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {conversation.unreadCount > 0 && (
            <Badge className="shrink-0">{conversation.unreadCount}</Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded hover:bg-muted"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAssignEmployee(conversation)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Assign Employee
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onAssignLabels(conversation)}>
                <Tags className="mr-2 h-4 w-4" />
                Assign Labels
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onPin?.(conversation)}>
                <Pin className="mr-2 h-4 w-4" />
                {conversation.isPinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onArchive?.(conversation)}>
                <Archive className="mr-2 h-4 w-4" />
                {conversation.isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="truncate text-sm mt-1">{conversation.lastMessage}</div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <div className="text-[11px] text-muted-foreground">
            {conversation.lastMessageAt
              ? new Date(conversation.lastMessageAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </div>

          {followUpBadge && (
            <Badge variant={followUpBadge.variant} className="h-5 text-[10px]">
              <CalendarClock className="mr-1 h-3 w-3" />
              {followUpBadge.text}
            </Badge>
          )}
        </div>

        {labels.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
            {labels.map((label) => (
              <Badge
                key={label._id}
                className="h-4 px-1 text-[9px]"
                style={{
                  backgroundColor: label.color,
                }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
