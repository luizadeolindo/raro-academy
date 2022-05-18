import starFavorited from "../../assets/icons/elements/star-filled.svg";
import { Link } from "react-router-dom";
import { VideoFavoritedProps } from "./VideoFavoritedTypes";

export const VideoFavorited = ({
  video,
  handleRemoveAFavorite,
}: VideoFavoritedProps) => {
  const { id, dataPublicacao, nome, thumbUrl } = video;
  const dataFormatada = new Date(dataPublicacao).toLocaleDateString("pt-br");

  return (
    <>
      <div className="videoContainer">
        <div className="videoThumb">
          <Link to={`/videos/${id}`}>
            <img src={thumbUrl} alt="videothumb" />
          </Link>
          <button
            className="favorite"
            onClick={(e) => handleRemoveAFavorite(id)}
          >
            <img src={starFavorited} alt="icon estrela preenchida" />
          </button>
        </div>
        <Link to={`/videos/${id}`}>
          <div>
            <p className="videoName">{nome}</p>
            <p className="videoDate">{dataFormatada}</p>
          </div>
        </Link>
      </div>
    </>
  );
};
