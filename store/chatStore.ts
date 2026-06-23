import { create } from "zustand";
import { Conversation } from "@/types/conversation";

type ChatStore = {
  conversations: Conversation[];

  setConversations: (conversations: Conversation[]) => void;

  addConversation: (conversation: Conversation) => void;

  updateConversation: (
    conversationId: string,
    data: Partial<Conversation>,
  ) => void;

  clearUnread: (conversationId: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],

  setConversations: (conversations) =>
    set({
      conversations,
    }),

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),

  updateConversation: (conversationId, data) =>
    set((state) => {
      const updated = state.conversations.map((conversation) =>
        conversation._id === conversationId
          ? {
              ...conversation,
              ...data,
            }
          : conversation,
      );

      const current = updated.find(
        (conversation) => conversation._id === conversationId,
      );

      const others = updated.filter(
        (conversation) => conversation._id !== conversationId,
      );

      return {
        conversations: current ? [current, ...others] : updated,
      };
    }),

  clearUnread: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation._id === conversationId
          ? {
              ...conversation,
              unreadCount: 0,
            }
          : conversation,
      ),
    })),
}));
