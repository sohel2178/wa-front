"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { updateTag } from "@/lib/tag-api";

import { Tag } from "@/types/tag";

type Props = {
  tag: Tag | null;

  open: boolean;

  onClose: () => void;

  onUpdated: () => void;
};

export default function EditTagDialog({
  tag,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");

  const [color, setColor] = useState("#3b82f6");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tag) return;

    setName(tag.name);

    setColor(tag.color);
  }, [tag]);

  const handleSave = async () => {
    if (!tag) return;

    try {
      setLoading(true);

      await updateTag(tag._id, {
        name,
        color,
      });

      onUpdated();

      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!tag) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <div className="flex gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <Input value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
