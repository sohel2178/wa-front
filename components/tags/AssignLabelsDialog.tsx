"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import { Tag } from "@/types/tag";

import { Conversation } from "@/types/conversation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;

  onClose: () => void;

  tags: Tag[];

  conversation: Conversation | null;

  onSaved: () => void;
};

export default function AssignLabelsDialog({
  open,
  onClose,
  tags,
  conversation,
  onSaved,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversation) return;

    setSelected(conversation.labels?.map((label) => label._id) || []);
  }, [conversation]);

  const toggleTag = (tagId: string) => {
    setSelected((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSave = async () => {
    if (!conversation) return;

    try {
      setLoading(true);

      await api.put(`/conversations/${conversation._id}/labels`, {
        labelIds: selected,
      });

      onSaved();

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Labels</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {tags.map((tag) => (
            <label key={tag._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(tag._id)}
                onChange={() => toggleTag(tag._id)}
              />

              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: tag.color,
                }}
              />

              {tag.name}
            </label>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
