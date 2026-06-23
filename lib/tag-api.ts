import api from "./api";

export const getTags = async () => {
  const { data } = await api.get("/tags");

  return data.data;
};

export const createTag = async (name: string, color: string) => {
  const { data } = await api.post("/tags", {
    name,
    color,
  });

  return data.data;
};

export const updateTag = async (id: string, payload: any) => {
  const { data } = await api.put(`/tags/${id}`, payload);

  return data.data;
};

export const deleteTag = async (id: string) => {
  await api.delete(`/tags/${id}`);
};
