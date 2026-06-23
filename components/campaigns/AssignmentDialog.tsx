"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Campaign {
  _id: string;
  campaignName: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  open: boolean;

  loading?: boolean;

  campaigns: Campaign[];

  employees: Employee[];

  initialValues?: {
    campaignId: string;
    assignedTo: string;
  };

  onClose: () => void;

  onSubmit: (data: { campaignId: string; assignedTo: string }) => Promise<void>;
}

export default function AssignmentDialog({
  open,
  loading,
  campaigns,
  employees,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const [campaignId, setCampaignId] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (initialValues) {
      setCampaignId(initialValues.campaignId);

      setAssignedTo(initialValues.assignedTo);
    } else {
      setCampaignId("");
      setAssignedTo("");
    }
  }, [initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Assignment" : "Assign Campaign"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <select
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Campaign</option>

            {campaigns.map((campaign) => (
              <option key={campaign._id} value={campaign._id}>
                {campaign.campaignName}
              </option>
            ))}
          </select>

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>

          <Button
            className="w-full"
            disabled={loading}
            onClick={() =>
              onSubmit({
                campaignId,
                assignedTo,
              })
            }
          >
            {loading ? "Saving..." : "Save Assignment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
