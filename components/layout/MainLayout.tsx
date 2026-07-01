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

// "use client";

// import { ReactNode } from "react";
// import AppSidebar from "./AppSidebar";

// export default function MainLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <AppSidebar />

//       <main className="flex-1 overflow-hidden bg-background">{children}</main>
//     </div>
//   );
// }
