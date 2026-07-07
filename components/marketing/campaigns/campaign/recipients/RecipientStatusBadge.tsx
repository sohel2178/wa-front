"use client";

import {
  Clock3,
  Loader2,
  Check,
  CheckCheck,
  MessageCircleReply,
  CircleX,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export type RecipientStatus =
  | "pending"
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed"
  | "replied";

interface Props {
  status: RecipientStatus;
}

export default function RecipientStatusBadge({ status }: Props) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />
          Pending
        </Badge>
      );

    case "sending":
      return (
        <Badge className="gap-1.5 bg-blue-600 hover:bg-blue-600">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Sending
        </Badge>
      );

    case "sent":
      return (
        <Badge className="gap-1.5 bg-indigo-600 hover:bg-indigo-600">
          <Check className="h-3.5 w-3.5" />
          Sent
        </Badge>
      );

    case "delivered":
      return (
        <Badge className="gap-1.5 bg-emerald-600 hover:bg-emerald-600">
          <CheckCheck className="h-3.5 w-3.5" />
          Delivered
        </Badge>
      );

    case "read":
      return (
        <Badge className="gap-1.5 bg-green-600 hover:bg-green-600">
          <CheckCheck className="h-3.5 w-3.5" />
          Read
        </Badge>
      );

    case "replied":
      return (
        <Badge className="gap-1.5 bg-violet-600 hover:bg-violet-600">
          <MessageCircleReply className="h-3.5 w-3.5" />
          Replied
        </Badge>
      );

    case "failed":
      return (
        <Badge variant="destructive" className="gap-1.5">
          <CircleX className="h-3.5 w-3.5" />
          Failed
        </Badge>
      );

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
