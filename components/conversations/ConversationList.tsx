"use client";

import { Conversation } from "@/types/conversation";

import ConversationItem from "./ConversationItem";
import { Loader2 } from "lucide-react";

type Props = {
  conversations: Conversation[];
  selectedId: string | null;
  loadingMore: boolean | false;
  onSelect: (id: string) => void;
  onAssignLabels: (conversation: Conversation) => void;
  onAssignEmployee: (conversation: Conversation) => void;
};

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onAssignLabels,
  onAssignEmployee,
  loadingMore,
}: Props) {
  return (
    <div className="h-full">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          selected={selectedId === conversation._id}
          onClick={() => onSelect(conversation._id)}
          onAssignLabels={onAssignLabels}
          onAssignEmployee={onAssignEmployee}
        />
      ))}

      {loadingMore && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading more conversations...
          </span>
        </div>
      )}
    </div>
  );
}
