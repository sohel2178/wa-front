"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import FollowUpForm, { FollowUpFormData } from "./FollowUpForm";

import { createFollowUp } from "@/lib/followup-api";
import { FollowUp } from "@/types/followup";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  conversationId: string;

  onSuccess?: (followUp: FollowUp) => void;
};

const initialForm: FollowUpFormData = {
  date: "",
  time: "",

  note: "",

  district: "",
  address: "",

  devicePrice: "",
  monthlyCharge: "",
};

export default function CreateFollowUpDialog({
  open,
  onOpenChange,
  conversationId,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<FollowUpFormData>(initialForm);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.date || !form.time) return;

    try {
      setLoading(true);

      const date = new Date(`${form.date}T${form.time}`);

      const followUp = await createFollowUp({
        conversationId: conversationId,
        date: date.toISOString(),

        note: form.note,

        salesSnapshot: {
          district: form.district,

          address: form.address,

          devicePrice: form.devicePrice ? Number(form.devicePrice) : null,

          monthlyCharge: form.monthlyCharge ? Number(form.monthlyCharge) : null,
        },
      });

      onSuccess?.(followUp);

      setForm(initialForm);

      onOpenChange(false);
    } catch (err) {
      console.error(err);

      alert("Failed to create follow-up.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!loading && !value) {
      setForm(initialForm);
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Follow-up</DialogTitle>
        </DialogHeader>

        <FollowUpForm value={form} onChange={setForm} />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading || !form.date || !form.time}
          >
            {loading ? "Saving..." : "Schedule Follow-up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
