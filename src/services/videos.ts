import apiClient from "./api-client";
import { VideoThumbnailProps } from "../components/Video/VideoThumbnailTypes";

export const addNewFav = async (videoId: string) => {
  await apiClient.post(`/videos/${videoId}/favoritos`);
};

export const deleteNewFav = async (videoId: string) => {
  await apiClient.delete(`/videos/${videoId}/favoritos`);
};

export const getVideos = async () => {
  await apiClient.get<VideoThumbnailProps[]>("/videos");
};
