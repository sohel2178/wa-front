"use client";

import { AnimatePresence, motion } from "framer-motion";

import { FollowUp } from "@/types/followup";

import FollowupCard from "./FollowupCard";
import FollowupSkeleton from "./FollowupSkeleton";
import FollowupEmpty from "./FollowupEmpty";

type Props = {
  followUps: FollowUp[];

  loading?: boolean;

  onRefresh?: () => void;

  onEdit?: (followUp: FollowUp) => void;

  onComplete?: (followUp: FollowUp) => void;

  onCancel?: (followUp: FollowUp) => void;
};

export default function FollowupList({
  followUps,
  loading = false,
  onRefresh,
  onEdit,
  onComplete,
  onCancel,
}: Props) {
  if (loading) {
    return <FollowupSkeleton />;
  }

  if (!followUps.length) {
    return <FollowupEmpty onRefresh={onRefresh} />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <motion.div
        layout
        className="grid gap-4 p-4 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          {followUps.map((followUp) => (
            <motion.div
              key={followUp._id}
              layout
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <FollowupCard
                followUp={followUp}
                onEdit={onEdit}
                onComplete={onComplete}
                onCancel={onCancel}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
