import { Link } from "react-router-dom";
import starFavorited from "../../assets/icons/elements/star-filled.svg";
import starNotFavorited from "../../assets/icons/elements/star-outline.svg";
import formatDate from "../../helpers/FormatDate";
import { useAuthenticated } from "../VerifyAuth";

export type VideoProps = {
  handleFavorite: (e: React.MouseEvent, id: string) => Promise<void>;
  checkIThatVideoIsAfavoriteVideo: (id: string) => boolean;
  video: {
    nome: string;
    id: string;
    createdAt: string;
    dataPublicacao: string;
    thumbUrl: string;
  };
};

export const Video = ({
  video,
  handleFavorite,
  checkIThatVideoIsAfavoriteVideo,
}: VideoProps) => {
  const { id, dataPublicacao, nome, thumbUrl } = video;
  formatDate(dataPublicacao);
  const { isAuthenticated } = useAuthenticated();

  return (
    <Link to={`/videos/${id}`} className="videoContainer">
      <div className="videoThumb">
        <img src={thumbUrl} alt="videothumb" />
        {isAuthenticated ? (
          <button className="favorite" onClick={(e) => handleFavorite(e, id)}>
            {checkIThatVideoIsAfavoriteVideo(id) ? (
              <img src={starFavorited} alt="icon estrela preenchida" />
            ) : (
              <img src={starNotFavorited} alt="icon estrela não preenchida" />
            )}
          </button>
        ) : (
          <></>
        )}
        <p className="videoName">{nome}</p>
        <p className="videoDate">{formatDate(dataPublicacao)}</p>
      </div>
    </Link>
  );
};
