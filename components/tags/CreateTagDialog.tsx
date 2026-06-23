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

import { createTag } from "@/lib/tag-api";

type Props = {
  open: boolean;

  onClose: () => void;

  onCreated: () => void;
};

export default function CreateTagDialog({ open, onClose, onCreated }: Props) {
  const [name, setName] = useState("");

  const [color, setColor] = useState("#3b82f6");

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      return;
    }

    try {
      setLoading(true);

      await createTag(name.trim(), color);

      setName("");

      setColor("#3b82f6");

      onCreated();

      onClose();
    } catch (error: any) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to create label");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setName("");

    setColor("#3b82f6");

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Label</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Label Name</label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VIP"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Color</label>

            <div className="flex items-center gap-3 mt-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 cursor-pointer"
              />

              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>

            <Button onClick={handleCreate} disabled={loading || !name.trim()}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
