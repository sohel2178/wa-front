// components/users/UserTable.tsx

"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, KeyRound } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import UserRoleBadge from "./UserRoleBadge";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  avatar?: string | null;
  online: boolean;
  lastSeen?: string | null;
  createdAt: string;
}

interface UserTableProps {
  users: User[];

  onDelete: (user: User) => void;

  onEdit?: (user: User) => void;
  onResetPassword?: (user: User) => void;
}

export default function UserTable({
  users,
  onDelete,
  onEdit,
  onResetPassword,
}: UserTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((x) => x[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="font-medium">{user.name}</div>

                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />

                    <span className="text-sm">
                      {user.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {user.online
                    ? "-"
                    : user.lastSeen
                      ? new Date(user.lastSeen).toLocaleString()
                      : "-"}
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      {onEdit ? (
                        <DropdownMenuItem onClick={() => onEdit(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href={`/users/${user._id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem onClick={() => onResetPassword?.(user)}>
                        <KeyRound className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(user)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
