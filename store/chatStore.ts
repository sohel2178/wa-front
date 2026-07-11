// import { create } from "zustand";
// import { Conversation } from "@/types/conversation";

// type ChatStore = {
//   conversations: Conversation[];

//   setConversations: (conversations: Conversation[]) => void;

//   addConversation: (conversation: Conversation) => void;

//   updateConversation: (
//     conversationId: string,
//     data: Partial<Conversation>,
//   ) => void;

//   clearUnread: (conversationId: string) => void;
// };

// export const useChatStore = create<ChatStore>((set) => ({
//   conversations: [],

//   setConversations: (conversations) =>
//     set({
//       conversations,
//     }),

//   addConversation: (conversation) =>
//     set((state) => ({
//       conversations: [conversation, ...state.conversations],
//     })),

//   updateConversation: (conversationId, data) =>
//     set((state) => {
//       const updated = state.conversations.map((conversation) =>
//         conversation._id === conversationId
//           ? {
//               ...conversation,
//               ...data,
//             }
//           : conversation,
//       );

//       const current = updated.find(
//         (conversation) => conversation._id === conversationId,
//       );

//       const others = updated.filter(
//         (conversation) => conversation._id !== conversationId,
//       );

//       return {
//         conversations: current ? [current, ...others] : updated,
//       };
//     }),

//   clearUnread: (conversationId) =>
//     set((state) => ({
//       conversations: state.conversations.map((conversation) =>
//         conversation._id === conversationId
//           ? {
//               ...conversation,
//               unreadCount: 0,
//             }
//           : conversation,
//       ),
//     })),
// }));

import { create } from "zustand";
import { Conversation } from "@/types/conversation";

type ChatStore = {
  conversations: Conversation[];

  setConversations: (conversations: Conversation[]) => void;

  appendConversations: (conversations: Conversation[]) => void;

  addConversation: (conversation: Conversation) => void;

  updateConversation: (
    conversationId: string,
    data: Partial<Conversation>,
  ) => void;

  clearUnread: (conversationId: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],

  // Replace entire list
  setConversations: (conversations) =>
    set({
      conversations,
    }),

  // Append next page without duplicates
  appendConversations: (conversations) =>
    set((state) => {
      const existingIds = new Set(state.conversations.map((c) => c._id));

      const newItems = conversations.filter((c) => !existingIds.has(c._id));

      return {
        conversations: [...state.conversations, ...newItems],
      };
    }),

  // New conversation from socket
  addConversation: (conversation) =>
    set((state) => {
      const index = state.conversations.findIndex(
        (c) => c._id === conversation._id,
      );

      if (index !== -1) {
        const others = state.conversations.filter(
          (c) => c._id !== conversation._id,
        );

        return {
          conversations: [conversation, ...others],
        };
      }

      return {
        conversations: [conversation, ...state.conversations],
      };
    }),

  // Existing conversation updated
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
