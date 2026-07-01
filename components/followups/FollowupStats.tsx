"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import {
  CalendarDays,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type Props = {
  today: number;
  upcoming: number;
  overdue: number;
  completed: number;
};

const stats = (
  today: number,
  upcoming: number,
  overdue: number,
  completed: number,
) => [
  {
    title: "Today",
    value: today,
    icon: CalendarDays,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    description: "Need attention today",
  },
  {
    title: "Upcoming",
    value: upcoming,
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    description: "Scheduled later",
  },
  {
    title: "Overdue",
    value: overdue,
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-500/10",
    description: "Immediate action",
  },
  {
    title: "Completed",
    value: completed,
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-500/10",
    description: "Finished today",
  },
];

export default function FollowupStats(props: Props) {
  return (
    <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats(props.today, props.upcoming, props.overdue, props.completed).map(
        (item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              transition={{
                duration: 0.15,
              }}
            >
              <Card className="shadow-sm transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        },
      )}
    </div>
  );
}
