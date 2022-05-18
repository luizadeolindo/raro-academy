import { VideoThumbnailProps } from "../Video/VideoThumbnailTypes";

export type PlaylistByTopicsProps = {
  videos: VideoThumbnailProps[];
  handleFavorite: (e: React.MouseEvent, id: string) => Promise<void>;
  checkIThatVideoIsAfavoriteVideo: (id: string) => boolean;
};
