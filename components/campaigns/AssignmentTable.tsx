"use client";

import { Pencil, Trash2, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export interface Assignment {
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

interface Props {
  assignments: Assignment[];

  onEdit: (assignment: Assignment) => void;

  onDelete: (assignment: Assignment) => void;
}

export default function AssignmentTable({
  assignments,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assignments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No assignments found
              </TableCell>
            </TableRow>
          ) : (
            assignments.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>{assignment.campaignName}</TableCell>

                <TableCell>{assignment.assignedTo?.name}</TableCell>

                <TableCell>{assignment.assignedTo?.email}</TableCell>

                <TableCell>
                  {assignment.active ? "Active" : "Inactive"}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(assignment)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(assignment)}
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
