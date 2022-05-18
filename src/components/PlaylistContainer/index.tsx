import "./PlaylistContainer.css";
import { PlaylistContainerProps } from "./PlaylistContainerTypes";

export const PlaylistContainer = ({ children }: PlaylistContainerProps) => {
  return <div className="playlistContainer">{children}</div>;
};
