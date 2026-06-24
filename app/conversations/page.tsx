"use client";

import { useEffect, useMemo, useState } from "react";

import api from "@/lib/api";
import useSocket from "@/hooks/useSocket";

import MainLayout from "@/components/layout/MainLayout";
import ConversationList from "@/components/conversations/ConversationList";
import EmptyChat from "@/components/chat/EmptyChat";
import ChatWindow from "@/components/chat/ChatWindow";

import { useChatStore } from "@/store/chatStore";
import { Tag } from "@/types/tag";
import { getTags } from "@/lib/tag-api";
import SearchBar from "@/components/conversations/SearchBar";
import LabelSidebar from "@/components/tags/LabelSidebar";
import CreateTagDialog from "@/components/tags/CreateTagDialog";
import ManageLabelsDialog from "@/components/tags/ManageLabelsDialog";
import { Conversation } from "@/types/conversation";
import AssignLabelsDialog from "@/components/tags/AssignLabelsDialog";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AssignConversationDialog from "@/components/conversations/AssignConversationDialog";

export default function ConversationsPage() {
  const socket = useSocket();

  const {
    conversations,
    setConversations,
    updateConversation,
    clearUnread,
    addConversation,
  } = useChatStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  const [search, setSearch] = useState("");

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const [showCreateLabel, setShowCreateLabel] = useState(false);

  const [showManageLabels, setShowManageLabels] = useState(false);

  const [assignEmployeeDialogOpen, setAssignEmployeeDialogOpen] =
    useState(false);

  const [assignConversation, setAssignConversation] =
    useState<Conversation | null>(null);

  const [assignLabelConversation, setAssignLabelConversation] =
    useState<Conversation | null>(null);

  const loadTags = async () => {
    const tags = await getTags();

    setTags(tags);
  };

  useEffect(() => {
    loadConversations();
    loadTags();
  }, []);

  useEffect(() => {
    const handler = (conversation: any) => {
      addConversation(conversation);
    };

    socket.on("conversation_created", handler);

    return () => {
      socket.off("conversation_created", handler);
    };
  }, [socket, addConversation]);

  useEffect(() => {
    const handler = (data: any) => {
      updateConversation(data.conversationId, data);
    };

    socket.on("conversation_updated", handler);

    return () => {
      socket.off("conversation_updated", handler);
    };
  }, [socket, updateConversation]);

  const loadConversations = async () => {
    try {
      const { data } = await api.get("/conversations");

      setConversations(data.conversations);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      !search ||
      conversation.contactId.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      conversation.contactId.phone?.includes(search);

    const matchesLabel =
      !selectedTagId ||
      conversation.labels?.some((label) => label._id === selectedTagId);

    return matchesSearch && matchesLabel;
  });

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation._id === selectedId) ||
      null,
    [conversations, selectedId],
  );

  const handleSelect = async (id: string) => {
    setSelectedId(id);

    clearUnread(id);

    try {
      await api.put(`/conversations/${id}/read`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="w-96 border-r flex flex-col h-screen">
          <SearchBar value={search} onChange={setSearch} />

          <LabelSidebar
            tags={tags}
            selectedTagId={selectedTagId}
            onSelect={setSelectedTagId}
            onCreate={() => setShowCreateLabel(true)}
            onManage={() => setShowManageLabels(true)}
          />

          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={filteredConversations}
              selectedId={selectedId}
              onSelect={handleSelect}
              onAssignLabels={(conversation) =>
                setAssignLabelConversation(conversation)
              }
              onAssignEmployee={(conversation) =>
                setAssignConversation(conversation)
              }
            />
          </div>
        </div>

        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            tags={tags}
            onLabelsUpdated={() => {
              loadConversations();
            }}
          />
        ) : (
          <EmptyChat />
        )}

        <CreateTagDialog
          open={showCreateLabel}
          onClose={() => setShowCreateLabel(false)}
          onCreated={loadTags}
        />

        <ManageLabelsDialog
          open={showManageLabels}
          tags={tags}
          onClose={() => setShowManageLabels(false)}
          onRefresh={loadTags}
        />

        <AssignLabelsDialog
          open={!!assignLabelConversation}
          conversation={assignLabelConversation}
          tags={tags}
          onClose={() => setAssignLabelConversation(null)}
          onSaved={() => {
            loadConversations();
          }}
        />

        <AssignConversationDialog
          open={!!assignConversation}
          onOpenChange={(open) => {
            if (!open) {
              setAssignConversation(null);
            }
          }}
          conversationId={assignConversation?._id || ""}
          currentAssignedTo={assignConversation?.assignedTo?._id}
          onAssigned={() => {
            loadConversations();
            setAssignConversation(null);
          }}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
