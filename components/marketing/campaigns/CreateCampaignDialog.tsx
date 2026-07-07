"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import { createCampaign, CreateCampaignRequest } from "@/lib/marketing-api";

import { MetaTemplate } from "@/types/meta-template";

import CampaignForm, { CampaignFormData } from "./CampaignForm";

import { Employee } from "@/components/common/EmployeeSelect";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";

interface User extends Employee {
  role: string;
}

type Props = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  templates: MetaTemplate[];

  onSuccess?: () => void;
};

const initialForm: CampaignFormData = {
  name: "",
  description: "",
  metaTemplate: "",
  assignedEmployee: "",
  scheduledAt: "",
};

export default function CreateCampaignDialog({
  open,
  onOpenChange,
  templates,
  onSuccess,
}: Props) {
  const [form, setForm] = useState(initialForm);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!open) return;

    const loadEmployees = async () => {
      try {
        setLoadingEmployees(true);

        const { data } = await api.get("/users");

        const users: User[] = data.data ?? data;

        setEmployees(
          users
            .filter((user) => user.role === "employee")
            .map((user) => ({
              _id: user._id,
              name: user.name,
              email: user.email,
            })),
        );
      } catch (error) {
        console.error(error);

        toast.error("Failed to load employees.");
      } finally {
        setLoadingEmployees(false);
      }
    };

    loadEmployees();
  }, [open]);

  const handleClose = () => {
    if (creating) return;

    setForm(initialForm);

    onOpenChange(false);
  };

  const handleSubmit = async () => {
    try {
      setCreating(true);

      const payload: CreateCampaignRequest = {
        name: form.name.trim(),

        description: form.description.trim(),

        metaTemplate: form.metaTemplate,

        assignedEmployee: form.assignedEmployee,

        scheduledAt: form.scheduledAt || undefined,
      };

      await createCampaign(payload);

      toast.success("Campaign created successfully.");

      setForm(initialForm);

      onOpenChange(false);

      onSuccess?.();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ?? "Failed to create campaign.",
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!creating) {
          if (!value) {
            setForm(initialForm);
          }

          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>

          <DialogDescription>
            Create a new WhatsApp template marketing campaign.
          </DialogDescription>
        </DialogHeader>

        <CampaignForm
          value={form}
          onChange={setForm}
          templates={templates.filter(
            (template) => template.status === "APPROVED" && template.isActive,
          )}
          employees={employees}
          loading={creating || loadingEmployees}
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
