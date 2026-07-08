"use client";

import Link from "next/link";

import { FollowUp } from "@/types/followup";

import { Button } from "@/components/ui/button";

import {
  Check,
  History,
  MessageCircle,
  Pencil,
  X,
  ClipboardCopy,
} from "lucide-react";
import { toast } from "sonner";

type Props = {
  followUp: FollowUp;

  onEdit?: (followUp: FollowUp) => void;

  onComplete?: (followUp: FollowUp) => void;

  onCancel?: (followUp: FollowUp) => void;

  onHistory?: (followUp: FollowUp) => void;
};

export default function FollowupActions({
  followUp,
  onEdit,
  onComplete,
  onCancel,
  onHistory,
}: Props) {
  const conversation = followUp.conversationId;

  const isScheduled = followUp.current.status === "scheduled";

  const handleCopy = async () => {
    const contact = followUp.conversationId.contactId;

    const district = followUp.salesSnapshot.district || "";
    const address = followUp.salesSnapshot.address || "";

    const fullAddress = [address, district].filter(Boolean).join(", ");

    // Convert +8801XXXXXXXXX -> 01XXXXXXXXX
    const phone = contact?.phone?.replace(/^880/, "0") ?? "";

    const text = `Customer Name: ${contact?.name ?? ""}
Customer Phone: ${phone}
Address: ${fullAddress}
Device Price: ৳${followUp.salesSnapshot.devicePrice ?? "-"}
Monthly Service Charge: ৳${followUp.salesSnapshot.monthlyCharge ?? "-"}
Note: ${followUp.current.note || "-"}`;

    try {
      await navigator.clipboard.writeText(text);

      // Optional
      toast.success("Customer details copied");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy");
    }
  };

  //   const handleCopy = async () => {
  //     const contact = followUp.conversationId.contactId;

  //     const text = `Customer Name: ${contact?.name ?? ""}
  // Customer Phone: ${contact?.phone ?? ""}`;

  //     try {
  //       await navigator.clipboard.writeText(text);

  //       toast.success("Customer details copied");
  //     } catch {
  //       toast.error("Failed to copy");
  //     }
  //   };
  return (
    <div className="flex items-center justify-end gap-1">
      {/* Open Conversation */}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleCopy}
        title="Copy Customer Details"
      >
        <ClipboardCopy className="h-4 w-4" />
      </Button>

      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
        <Link href={`/conversations?id=${conversation._id}`}>
          <MessageCircle className="h-4 w-4" />
        </Link>
      </Button>

      {/* Edit */}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onEdit?.(followUp)}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      {/* History */}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 gap-1"
        onClick={() => onHistory?.(followUp)}
      >
        <History className="h-4 w-4" />
        {followUp.history.length}
      </Button>

      {/* Complete */}

      {isScheduled && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-green-600 hover:text-green-700"
          onClick={() => onComplete?.(followUp)}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}

      {/* Cancel */}

      {isScheduled && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700"
          onClick={() => onCancel?.(followUp)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
