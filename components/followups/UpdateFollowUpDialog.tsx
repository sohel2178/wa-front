"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import FollowUpForm, { FollowUpFormData } from "./FollowUpForm";

import { FollowUp } from "@/types/followup";
import { updateFollowUp } from "@/lib/followup-api";
import { BangladeshDistrict } from "@/lib/bangladesh-districts";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  followUp: FollowUp;

  onSuccess?: (followUp: FollowUp) => void;
};

const emptyForm: FollowUpFormData = {
  date: "",
  time: "",

  note: "",

  district: "",
  address: "",

  devicePrice: "",
  monthlyCharge: "",
};

export default function UpdateFollowUpDialog({
  open,
  onOpenChange,
  followUp,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<FollowUpFormData>(emptyForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!followUp) return;

    const scheduled = new Date(followUp.current.scheduledAt);

    setForm({
      date: scheduled.toISOString().slice(0, 10),

      time: scheduled.toTimeString().slice(0, 5),

      note: followUp.current.note || "",

      district: (followUp.salesSnapshot.district as BangladeshDistrict) || "",

      address: followUp.salesSnapshot.address || "",

      devicePrice: followUp.salesSnapshot.devicePrice?.toString() ?? "",

      monthlyCharge: followUp.salesSnapshot.monthlyCharge?.toString() ?? "",
    });
  }, [followUp]);

  const save = async (status?: "completed" | "cancelled" | "scheduled") => {
    try {
      setLoading(true);

      const payload: any = {};

      // -----------------------------
      // Date
      // -----------------------------

      const scheduledAt = new Date(`${form.date}T${form.time}`).toISOString();

      if (
        scheduledAt !== new Date(followUp.current.scheduledAt).toISOString()
      ) {
        payload.date = scheduledAt;
      }

      // -----------------------------
      // Note
      // -----------------------------

      if (form.note !== followUp.current.note) {
        payload.note = form.note;
      }

      // -----------------------------
      // Sales Snapshot
      // -----------------------------

      const salesSnapshot: any = {};

      if (form.district !== (followUp.salesSnapshot.district || "")) {
        salesSnapshot.district = form.district;
      }

      if (form.address !== (followUp.salesSnapshot.address || "")) {
        salesSnapshot.address = form.address;
      }

      const devicePrice = form.devicePrice ? Number(form.devicePrice) : null;

      if (devicePrice !== followUp.salesSnapshot.devicePrice) {
        salesSnapshot.devicePrice = devicePrice;
      }

      const monthlyCharge = form.monthlyCharge
        ? Number(form.monthlyCharge)
        : null;

      if (monthlyCharge !== followUp.salesSnapshot.monthlyCharge) {
        salesSnapshot.monthlyCharge = monthlyCharge;
      }

      if (Object.keys(salesSnapshot).length > 0) {
        payload.salesSnapshot = salesSnapshot;
      }

      // -----------------------------
      // Status
      // -----------------------------

      if (status) {
        payload.status = status;
      }

      // Nothing changed

      if (Object.keys(payload).length === 0) {
        onOpenChange(false);
        return;
      }

      const updated = await updateFollowUp(followUp._id, payload);

      onSuccess?.(updated);

      onOpenChange(false);
    } catch (err) {
      console.error(err);

      alert("Failed to update follow-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Follow-up</DialogTitle>
        </DialogHeader>

        <FollowUpForm value={form} onChange={setForm} />

        <div className="flex flex-wrap justify-between gap-2 pt-4">
          <div className="flex gap-2">
            <Button
              variant="destructive"
              disabled={loading}
              onClick={() => save("cancelled")}
            >
              Cancel Follow-up
            </Button>

            <Button
              variant="secondary"
              disabled={loading}
              onClick={() => save("completed")}
            >
              Complete
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>

            <Button
              disabled={loading || !form.date || !form.time}
              onClick={() => save("scheduled")}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
