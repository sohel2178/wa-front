"use client";

import { motion } from "framer-motion";

import {
  CalendarDays,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Props = {
  today: number;
  upcoming: number;
  overdue: number;
  completed: number;
  cancelled: number;
};

export default function FollowupStats({
  today,
  upcoming,
  overdue,
  completed,
  cancelled,
}: Props) {
  const stats = [
    {
      label: "Today",
      value: today,
      icon: CalendarDays,
      iconClass: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-950/40",
      border: "border-blue-200 dark:border-blue-900",
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: Clock3,
      iconClass: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-900",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      iconClass: "text-red-600",
      bg: "bg-red-100 dark:bg-red-950/40",
      border: "border-red-200 dark:border-red-900",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      iconClass: "text-green-600",
      bg: "bg-green-100 dark:bg-green-950/40",
      border: "border-green-200 dark:border-green-900",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: XCircle,
      iconClass: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-900/40",
      border: "border-slate-200 dark:border-slate-800",
    },
  ];

  return (
    <div className="border-b bg-muted/20">
      <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-none">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={`
                flex min-w-fit items-center gap-3 rounded-xl border
                px-4 py-3
                ${item.bg}
                ${item.border}
              `}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                <Icon className={`h-5 w-5 ${item.iconClass}`} />
              </div>

              <div>
                <div className="text-xs text-muted-foreground">
                  {item.label}
                </div>

                <div className="text-xl font-bold leading-none">
                  {item.value}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
