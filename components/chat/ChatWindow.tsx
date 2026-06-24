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
import ScheduleFollowupDialog from "../followups/ScheduleFollowupDialog";

type Props = {
  conversation: Conversation;

  tags: Tag[];

  onLabelsUpdated: () => void;
};

export default function ChatWindow({
  conversation,
  tags,
  onLabelsUpdated,
}: Props) {
  const socket = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const [showAssignLabels, setShowAssignLabels] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const [followupOpen, setFollowupOpen] = useState(false);

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

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m._id === message._id);

      if (exists) return prev;

      return [...prev, message];
    });
  };

  return (
    <div className="flex flex-1 flex-col h-screen">
      <ChatHeader
        conversation={conversation}
        onAssignLabels={() => setShowAssignLabels(true)}
        onSearchMessages={() => setShowSearch(true)}
        onScheduleFollowup={() => setFollowupOpen(true)}
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
          onLabelsUpdated();
        }}
      />

      <ScheduleFollowupDialog
        open={followupOpen}
        onOpenChange={setFollowupOpen}
        conversationId={conversation._id}
      />
    </div>
  );
}
