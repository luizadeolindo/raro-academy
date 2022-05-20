import apiClient from "./api-client";

export const patchCommentary = async (
  id: string | undefined,
  commentaryId: string,
  newText: string
) => {
  await apiClient.patch(`/videos/${id}/comentarios/${commentaryId}`, {
    texto: newText,
  });
};

export const deleteCommentary = async (
  id: string | undefined,
  commentaryId: string
) => {
  await apiClient.delete(`/videos/${id}/comentarios/${commentaryId}`);
};

export const deleteDownVote = async (
  id: string | undefined,
  commentaryId: string
) => {
  await apiClient.delete(`/videos/${id}/comentarios/${commentaryId}/votes`);
};

export const putDownVote = async (
  id: string | undefined,
  commentaryId: string
) => {
  await apiClient.put(`/videos/${id}/comentarios/${commentaryId}/votes`, {
    vote: "down",
  });
};

export const deleteUpVote = async (
  id: string | undefined,
  commentaryId: string
) => {
  await apiClient.delete(`/videos/${id}/comentarios/${commentaryId}/votes`);
};

export const putUpVote = async (
  id: string | undefined,
  commentaryId: string
) => {
  await apiClient.put(`/videos/${id}/comentarios/${commentaryId}/votes`, {
    vote: "up",
  });
};

export const postCommentary = async (id: string | undefined, input: string) => {
  await apiClient.post(`/videos/${id}/comentarios`, { texto: input });
};
