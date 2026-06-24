"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  conversationId: string;

  currentAssignedTo?: string | null;

  onAssigned?: () => void;
};

export default function AssignConversationDialog({
  open,
  onOpenChange,
  conversationId,
  currentAssignedTo,
  onAssigned,
}: Props) {
  const [employees, setEmployees] = useState<User[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    try {
      const { data } = await api.get("/users");

      console.log(data, "User Lodas from Backend");

      const employeeUsers = (data || []).filter(
        (user: User) => user.role !== "admin",
      );

      setEmployees(employeeUsers);
    } catch (error) {
      console.error("Failed to load employees", error);
    }
  };

  useEffect(() => {
    if (!open) return;

    loadEmployees();

    if (currentAssignedTo) {
      setSelectedEmployee(currentAssignedTo);
    }
  }, [open, currentAssignedTo]);

  const handleAssign = async () => {
    if (!selectedEmployee) return;

    try {
      setLoading(true);

      await api.put(`/conversations/${conversationId}/assign`, {
        employeeId: selectedEmployee,
      });

      onAssigned?.();

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to assign conversation", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Conversation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              onClick={handleAssign}
              disabled={!selectedEmployee || loading}
            >
              {loading ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
