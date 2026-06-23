"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import api from "@/lib/api";

import UserTable from "@/components/users/UserTable";
import UserDeleteDialog from "@/components/users/UserDeleteDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import ResetPasswordDialog from "@/components/users/ResetPasswordDialog";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  avatar?: string | null;
  online: boolean;
  lastSeen?: string | null;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users");

      setUsers(response.data);
    } catch (error) {
      console.error(error);

      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setDeleteLoading(true);

      await api.delete(`/users/${selectedUser._id}`);

      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));

      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>

            <p className="text-muted-foreground">Manage employee accounts</p>
          </div>

          <Button asChild>
            <Link href="/users/create">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="rounded-lg border p-8 text-center">
            Loading users...
          </div>
        ) : (
          <UserTable
            users={filteredUsers}
            onDelete={(user) => {
              setSelectedUser(user);
              setDeleteDialogOpen(true);
            }}
            onResetPassword={(user) => {
              setSelectedUser(user);
              setResetPasswordOpen(true);
            }}
          />
        )}

        <UserDeleteDialog
          open={deleteDialogOpen}
          loading={deleteLoading}
          userName={selectedUser?.name}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
        />

        <ResetPasswordDialog
          open={resetPasswordOpen}
          userId={selectedUser?._id || null}
          userName={selectedUser?.name}
          onClose={() => {
            setResetPasswordOpen(false);
            setSelectedUser(null);
          }}
        />
      </div>
    </MainLayout>
  );
}
