"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteTag } from "@/lib/tag-api";

import { Tag } from "@/types/tag";

type Props = {
  tag: Tag | null;

  open: boolean;

  onClose: () => void;

  onDeleted: () => void;
};

export default function DeleteTagDialog({
  tag,
  open,
  onClose,
  onDeleted,
}: Props) {
  const handleDelete = async () => {
    if (!tag) return;

    await deleteTag(tag._id);

    onDeleted();

    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Label</AlertDialogTitle>

          <AlertDialogDescription>
            Delete "{tag?.name}" ?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
