import { Conversation } from "./conversation";
import { User } from "./user";
import { BangladeshDistrict } from "@/lib/bangladesh-districts";

export interface SalesSnapshot {
  district?: BangladeshDistrict | "";
  address: string;
  devicePrice: number | null;
  monthlyCharge: number | null;
}

export interface FollowUpHistory {
  action:
    | "created"
    | "rescheduled"
    | "completed"
    | "cancelled"
    | "sales_updated"
    | "note_updated";

  status: "scheduled" | "completed" | "cancelled" | "missed";

  scheduledAt: string;

  note: string;

  createdBy: User;

  createdAt: string;
}

export interface FollowUp {
  _id: string;

  conversationId: Conversation;

  createdBy: User;

  current: {
    status: "scheduled" | "completed" | "cancelled" | "missed";

    scheduledAt: string;

    note: string;

    updatedBy?: User;

    updatedAt?: string;
  };

  salesSnapshot: SalesSnapshot;

  history: FollowUpHistory[];

  createdAt: string;

  updatedAt: string;
}
