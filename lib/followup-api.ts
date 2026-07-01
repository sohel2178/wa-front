import api from "./api";

import { FollowUp, SalesSnapshot } from "@/types/followup";

/**
 * Create Follow-up
 */
export const createFollowUp = async (data: {
  conversationId: string;
  date: string;
  note?: string;
  salesSnapshot?: SalesSnapshot;
}): Promise<FollowUp> => {
  const res = await api.post("/followups", data);

  return res.data.followUp;
};

/**
 * Update Follow-up
 */
export const updateFollowUp = async (
  followUpId: string,
  data: {
    date?: string;
    note?: string;
    status?: "scheduled" | "completed" | "cancelled";
    salesSnapshot?: Partial<SalesSnapshot>;
  },
): Promise<FollowUp> => {
  const res = await api.patch(`/followups/${followUpId}`, data);

  return res.data.followUp;
};

/**
 * Delete Follow-up
 */
export const deleteFollowUp = async (followUpId: string): Promise<void> => {
  await api.delete(`/followups/${followUpId}`);
};

/**
 * Get Follow-up by ID
 */
export const getFollowUp = async (followUpId: string): Promise<FollowUp> => {
  const res = await api.get(`/followups/${followUpId}`);

  return res.data.followUp;
};

/**
 * Today's Follow-ups
 */
export const getTodaysFollowUps = async (): Promise<FollowUp[]> => {
  const res = await api.get("/followups/today");

  return res.data.followUps;
};

/**
 * Upcoming Follow-ups
 */
export const getUpcomingFollowUps = async (): Promise<FollowUp[]> => {
  const res = await api.get("/followups/upcoming");

  return res.data.followUps;
};

/**
 * Overdue Follow-ups
 */
export const getOverdueFollowUps = async (): Promise<FollowUp[]> => {
  const res = await api.get("/followups/overdue");

  return res.data.followUps;
};

export const getCompletedFollowUps = async (): Promise<FollowUp[]> => {
  const res = await api.get("/followups/completed");

  return res.data.followUps;
};

/**
 * Employee Schedule
 */
export const getEmployeeSchedule = async (): Promise<FollowUp[]> => {
  const res = await api.get("/followups/schedule");

  return res.data.followUps;
};
