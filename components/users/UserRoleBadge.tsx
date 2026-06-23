// components/users/UserRoleBadge.tsx

import { Badge } from "@/components/ui/badge";

interface UserRoleBadgeProps {
  role: string;
}

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const isAdmin = role === "admin";

  return (
    <Badge variant={isAdmin ? "default" : "secondary"}>
      {isAdmin ? "Admin" : "Employee"}
    </Badge>
  );
}
