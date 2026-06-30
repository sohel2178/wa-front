"use client";

import { useCallback, useEffect, useState } from "react";
import { Conversation } from "@/types/conversation";

import api from "@/lib/api";
import useSocket from "@/hooks/useSocket";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

import { Message, MessageStatus } from "@/types/message";
import AssignLabelsDialog from "../tags/AssignLabelsDialog";
import { Tag } from "@/types/tag";
import CreateFollowUpDialog from "../followups/CreateFollowUpDialog";
import UpdateFollowUpDialog from "../followups/UpdateFollowUpDialog";

import { updateFollowUp } from "@/lib/followup-api";

type Props = {
  conversation: Conversation;

  tags: Tag[];

  onConversationUpdated: () => void;
};

export default function ChatWindow({
  conversation,
  tags,
  onConversationUpdated,
}: Props) {
  const socket = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const [showAssignLabels, setShowAssignLabels] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!conversation?._id) return;

    try {
      setLoading(true);

      const { data } = await api.get(`/messages/${conversation._id}`);

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Load messages failed:", error);
    } finally {
      setLoading(false);
    }
  }, [conversation?._id]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (!conversation?._id) return;

    socket.emit("conversation:join", conversation._id);

    return () => {
      socket.emit("conversation:leave", conversation._id);
    };
  }, [socket, conversation?._id]);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === message._id);

        if (exists) return prev;

        return [...prev, message];
      });
    };

    const handleStatus = ({
      waMessageId,
      status,
    }: {
      waMessageId: string;
      status: MessageStatus;
    }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.waMessageId === waMessageId
            ? {
                ...msg,
                status,
              }
            : msg,
        ),
      );
    };

    socket.on("new_message", handleNewMessage);

    socket.on("message_status", handleStatus);

    return () => {
      socket.off("new_message", handleNewMessage);

      socket.off("message_status", handleStatus);
    };
  }, [socket]);

  const handleComplete = async () => {
    if (!conversation.followUp) return;

    try {
      await updateFollowUp(conversation.followUp._id, {
        status: "completed",
      });

      // TODO
      // Refresh conversation from parent
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async () => {
    if (!conversation.followUp) return;

    try {
      await updateFollowUp(conversation.followUp._id, {
        status: "cancelled",
      });

      // TODO
      // Refresh conversation from parent
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-screen">
      <ChatHeader
        conversation={conversation}
        onAssignLabels={() => setShowAssignLabels(true)}
        onSearchMessages={() => setShowSearch(true)}
        onCreateFollowUp={() => setCreateOpen(true)}
        onUpdateFollowUp={() => setUpdateOpen(true)}
        onCompleteFollowUp={handleComplete}
        onCancelFollowUp={handleCancel}
      />

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          Loading messages...
        </div>
      ) : (
        <MessageList messages={messages} />
      )}

      <ChatInput conversationId={conversation._id} />

      <AssignLabelsDialog
        open={showAssignLabels}
        conversation={conversation}
        tags={tags}
        onClose={() => setShowAssignLabels(false)}
        onSaved={() => {
          onConversationUpdated();
        }}
      />

      <CreateFollowUpDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        conversationId={conversation._id}
        onSuccess={() => {
          onConversationUpdated();
        }}
      />

      {conversation.followUp && (
        <UpdateFollowUpDialog
          open={updateOpen}
          onOpenChange={setUpdateOpen}
          followUp={conversation.followUp}
          onSuccess={() => {
            onConversationUpdated();
          }}
        />
      )}
    </div>
  );
}
