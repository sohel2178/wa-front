"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

import MainLayout from "@/components/layout/MainLayout";

import AssignmentTable from "@/components/campaigns/AssignmentTable";
import AssignmentDialog from "@/components/campaigns/AssignmentDialog";
import AssignmentDeleteDialog from "@/components/campaigns/AssignmentDeleteDialog";

import { Button } from "@/components/ui/button";

interface Campaign {
  _id: string;
  campaignName: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Assignment {
  _id: string;

  campaignId: string;
  campaignName: string;

  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };

  active: boolean;
}

export default function CampaignAssignmentsPage() {
  const [loading, setLoading] = useState(true);

  const [saveLoading, setSaveLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const [syncLoading, setSyncLoading] = useState(false);

  const handleSyncCampaigns = async () => {
    try {
      setSyncLoading(true);

      await api.post("/meta/sync");

      toast.success("Campaigns synced successfully");

      await loadData();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to sync campaigns");
    } finally {
      setSyncLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const [assignmentsResponse, campaignsResponse, usersResponse] =
        await Promise.all([
          api.get("/campaign-assignments"),
          api.get("/campaign-assignments/campaigns"),
          api.get("/users"),
        ]);

      setAssignments(assignmentsResponse.data);

      setCampaigns(campaignsResponse.data);

      setEmployees(
        usersResponse.data.filter((user: Employee) => user.role === "employee"),
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to load campaign assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (values: {
    campaignId: string;
    assignedTo: string;
  }) => {
    try {
      setSaveLoading(true);

      await api.post("/campaign-assignments", values);

      toast.success("Assignment created successfully");

      setDialogOpen(false);

      await loadData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create assignment",
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleUpdate = async (values: {
    campaignId: string;
    assignedTo: string;
  }) => {
    if (!selectedAssignment) return;

    try {
      setSaveLoading(true);

      await api.put(`/campaign-assignments/${selectedAssignment._id}`, {
        assignedTo: values.assignedTo,
      });

      toast.success("Assignment updated successfully");

      setDialogOpen(false);

      setSelectedAssignment(null);

      await loadData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update assignment",
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAssignment) return;

    try {
      setDeleteLoading(true);

      await api.delete(`/campaign-assignments/${selectedAssignment._id}`);

      toast.success("Assignment deleted successfully");

      setDeleteOpen(false);

      setSelectedAssignment(null);

      await loadData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete assignment",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Campaign Assignments</h1>

            <p className="text-muted-foreground">
              Assign Meta campaigns to employees
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSyncCampaigns}
              disabled={syncLoading}
            >
              {syncLoading ? "Syncing..." : "Sync Campaigns"}
            </Button>

            <Button
              onClick={() => {
                setSelectedAssignment(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Assign Campaign
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border p-8 text-center">Loading...</div>
        ) : (
          <AssignmentTable
            assignments={assignments}
            onEdit={(assignment) => {
              setSelectedAssignment(assignment);

              setDialogOpen(true);
            }}
            onDelete={(assignment) => {
              setSelectedAssignment(assignment);

              setDeleteOpen(true);
            }}
          />
        )}

        <AssignmentDialog
          open={dialogOpen}
          loading={saveLoading}
          campaigns={campaigns}
          employees={employees}
          initialValues={
            selectedAssignment
              ? {
                  campaignId: selectedAssignment.campaignId,
                  assignedTo: selectedAssignment.assignedTo._id,
                }
              : undefined
          }
          onClose={() => {
            setDialogOpen(false);
            setSelectedAssignment(null);
          }}
          onSubmit={selectedAssignment ? handleUpdate : handleCreate}
        />

        <AssignmentDeleteDialog
          open={deleteOpen}
          loading={deleteLoading}
          campaignName={selectedAssignment?.campaignName}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedAssignment(null);
          }}
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  );
}
