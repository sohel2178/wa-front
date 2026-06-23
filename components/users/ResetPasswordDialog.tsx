"use client";

import { useState } from "react";
import { toast } from "sonner";

import api from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ResetPasswordDialogProps {
  open: boolean;
  userId: string | null;
  userName?: string;
  onClose: () => void;
}

export default function ResetPasswordDialog({
  open,
  userId,
  userName,
  onClose,
}: ResetPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      return toast.error("Password is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await api.put(`/users/${userId}/reset-password`, {
        password,
      });

      toast.success("Password reset successfully");

      setPassword("");
      setConfirmPassword("");

      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>

          <DialogDescription>
            Set a new password for <strong>{userName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button className="w-full" disabled={loading} onClick={handleSubmit}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
