import "./PlaylistTitle.css";
import { TitleProps } from "./PlaylistTitleProps";

export const PlaylistTitle = (props: TitleProps) => {
  return <h2 className="playlistTitle">{props.title}</h2>;
};
