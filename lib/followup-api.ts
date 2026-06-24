import api from "./api";

export const getTodaysFollowUps = async () => {
  const res = await api.get("/followups/today");
  return res.data;
};

export const getUpcomingFollowUps = async () => {
  const res = await api.get("/followups/upcoming");
  return res.data;
};

export const getOverdueFollowUps = async () => {
  const res = await api.get("/followups/overdue");
  return res.data;
};

export const scheduleFollowUp = async (
  conversationId: string,
  data: {
    date: string;
    note: string;
  },
) => {
  const res = await api.post(`/conversations/${conversationId}/followup`, data);

  return res.data;
};

export const completeFollowUp = async (conversationId: string) => {
  const res = await api.patch(
    `/conversations/${conversationId}/followup/complete`,
  );

  return res.data;
};
