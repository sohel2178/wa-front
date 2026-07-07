import { User } from "./user";

export type RecipientStatus =
  | "pending"
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "replied"
  | "failed";

export interface CampaignRecipient {
  _id: string;

  campaign: string;

  assignedEmployee: User;

  recipientIndex: number;

  phone: string;

  name: string;

  variables: Record<string, string>;

  status: RecipientStatus;

  whatsappMessageId?: string;

  conversation?: string;

  source: string;

  metadata: Record<string, unknown>;

  error?: {
    code?: string;

    message?: string;
  };

  sentAt?: string;

  deliveredAt?: string;

  readAt?: string;

  repliedAt?: string;

  createdAt: string;

  updatedAt: string;
}

export interface RecipientStatistics {
  total: number;

  pending: number;

  sending: number;

  sent: number;

  delivered: number;

  read: number;

  replied: number;

  failed: number;
}
