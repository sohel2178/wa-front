import { Tag } from "./tag";

export interface Conversation {
  _id: string;

  contactId: {
    _id: string;
    name: string;
    phone: string;
    profilePicture?: string | null;
  };

  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  } | null;

  labels?: Tag[];

  lastMessage: string;

  lastMessageType: string;

  unreadCount: number;

  lastMessageAt: string | null;

  isArchived: boolean;

  isPinned: boolean;

  createdAt: string;

  updatedAt: string;
}
