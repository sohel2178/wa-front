"use client";

import Link from "next/link";
import {
  MessageSquare,
  Users,
  LayoutDashboard,
  LogOut,
  User,
  UserCheck,
  CalendarDays,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

export default function AppSidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  // console.log(user);

  const handleLogout = () => {
    logout();

    router.replace("/login");
  };

  return (
    <div className="w-16 border-r h-screen flex flex-col items-center py-4 gap-6">
      <Link href="/dashboard">
        <LayoutDashboard className="h-6 w-6" />
      </Link>

      {user?.role === "admin" && (
        <Link href="/users">
          <User className="h-6 w-6" />
        </Link>
      )}

      {user?.role === "admin" && (
        <Link href="/campaign-assignments">
          <UserCheck className="h-6 w-6" />
        </Link>
      )}

      <Link href="/conversations">
        <MessageSquare className="h-6 w-6" />
      </Link>

      <Link href="/contacts">
        <Users className="h-6 w-6" />
      </Link>

      <Link href="/followups">
        <CalendarDays className="h-6 w-6" />
      </Link>

      <button onClick={handleLogout}>
        <LogOut className="h-6 w-6" />
      </button>
    </div>
  );
}
