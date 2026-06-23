"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MainLayout from "@/components/layout/MainLayout";
import UserForm from "@/components/users/UserForm";
import { toast } from "sonner";

import api from "@/lib/api";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "employee";
}

export default function CreateUserPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: UserFormValues) => {
    try {
      setLoading(true);

      await api.post("/users", values);

      //   alert("User created successfully");
      toast.success("User created successfully");

      router.push("/users");
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message);

      //   alert(error?.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create User</h1>

            <p className="text-muted-foreground">
              Create a new employee or admin account
            </p>
          </div>

          <div className="rounded-lg border bg-background p-6">
            <UserForm loading={loading} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
