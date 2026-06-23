"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import MainLayout from "@/components/layout/MainLayout";
import UserForm from "@/components/users/UserForm";

import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
}

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "employee";
}

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setPageLoading(true);

      const response = await api.get(`/users/${id}`);

      setUser(response.data);
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to load user");

      router.push("/users");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (values: UserFormValues) => {
    try {
      setLoading(true);

      await api.put(`/users/${id}`, {
        name: values.name,
        email: values.email,
        role: values.role,
      });

      toast.success("User updated successfully");

      router.push("/users");
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <MainLayout>
        <div className="p-6">Loading user...</div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="p-6">User not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit User</h1>

            <p className="text-muted-foreground">Update user information</p>
          </div>

          <div className="rounded-lg border bg-background p-6">
            <UserForm
              isEdit
              loading={loading}
              initialValues={{
                name: user.name,
                email: user.email,
                role: user.role,
              }}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
