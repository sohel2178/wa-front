export type MessageStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";

export interface Message {
  _id: string;

  conversationId: string;

  waMessageId?: string;

  direction: "inbound" | "outbound";

  type: "text" | "image" | "audio" | "video" | "document";

  text: string;

  mediaUrl?: string | null;
  mimeType?: string | null;

  fileName?: string | null;

  isVoice?: boolean;

  status: MessageStatus;

  sender?: string | null;

  timestamp: string;

  createdAt: string;

  updatedAt: string;
}
