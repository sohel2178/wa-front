"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Tag } from "@/types/tag";

import CreateTagDialog from "./CreateTagDialog";
import EditTagDialog from "./EditTagDialog";
import DeleteTagDialog from "./DeleteTagDialog";

type Props = {
  open: boolean;

  tags: Tag[];

  onClose: () => void;

  onRefresh: () => void;
};

export default function ManageLabelsDialog({
  open,
  tags,
  onClose,
  onRefresh,
}: Props) {
  const [showCreate, setShowCreate] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);

    setShowEdit(true);
  };

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag);

    setShowDelete(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Labels</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-112.5 overflow-y-auto">
            {tags.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No labels created yet
              </div>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag._id}
                  className="flex items-center justify-between border rounded-lg px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: tag.color,
                      }}
                    />

                    <span>{tag.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(tag)}
                    >
                      ✏️
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(tag)}
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4">
            <Button className="w-full" onClick={() => setShowCreate(true)}>
              + Create Label
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateTagDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={onRefresh}
      />

      <EditTagDialog
        open={showEdit}
        tag={selectedTag}
        onClose={() => setShowEdit(false)}
        onUpdated={onRefresh}
      />

      <DeleteTagDialog
        open={showDelete}
        tag={selectedTag}
        onClose={() => setShowDelete(false)}
        onDeleted={onRefresh}
      />
    </>
  );
}
