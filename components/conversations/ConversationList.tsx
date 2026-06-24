"use client";

import { Conversation } from "@/types/conversation";

import ConversationItem from "./ConversationItem";

type Props = {
  conversations: Conversation[];
  selectedId: string | null;
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
    </div>
  );
}
