// components/users/UserForm.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "employee";
}

interface UserFormProps {
  initialValues?: UserFormValues;
  isEdit?: boolean;
  loading?: boolean;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export default function UserForm({
  initialValues,
  isEdit,
  loading,
  onSubmit,
}: UserFormProps) {
  const [form, setForm] = useState<UserFormValues>({
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    password: "",
    role: initialValues?.role || "employee",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      {!isEdit && (
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
      )}

      <select
        value={form.role}
        onChange={(e) =>
          setForm({
            ...form,
            role: e.target.value as "admin" | "employee",
          })
        }
        className="w-full border rounded-md px-3 py-2"
      >
        <option value="employee">Employee</option>

        <option value="admin">Admin</option>
      </select>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update User" : "Create User"}
      </Button>
    </form>
  );
}
