"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import api from "@/lib/api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  conversationId: string;

  onSuccess?: () => void;
};

export default function ScheduleFollowupDialog({
  open,
  onOpenChange,
  conversationId,
  onSuccess,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const dateTime = new Date(`${date}T${time}`).toISOString();

      await api.post(`/conversations/${conversationId}/followup`, {
        date: dateTime,
        note,
      });

      onSuccess?.();

      onOpenChange(false);

      setDate("");
      setTime("");
      setNote("");
    } catch (error) {
      console.error(error);
      alert("Failed to schedule follow-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Follow-up</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Date</label>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Time</label>

            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Note</label>

            <textarea
              className="w-full min-h-25 border rounded-md p-3 text-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Call customer regarding quotation..."
            />
          </div>

          <Button
            className="w-full"
            disabled={!date || !time || loading}
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Schedule Follow-up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
