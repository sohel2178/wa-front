// components/users/UserDeleteDialog.tsx

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

interface UserDeleteDialogProps {
  open: boolean;
  loading?: boolean;
  userName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function UserDeleteDialog({
  open,
  loading,
  userName,
  onClose,
  onConfirm,
}: UserDeleteDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete <strong>{userName}</strong>?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={loading} onClick={onConfirm}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
