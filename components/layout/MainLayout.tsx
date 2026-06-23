"use client";

import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />
      {children}
    </div>
  );
}
