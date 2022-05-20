import ReactPlayer from "react-player";
import { VideoType } from "./VideoType";
import "./VideoPlayer.css";
import apiClient from "../../services/api-client";
import { useMemo } from "react";
import { useAuthenticated } from "../VerifyAuth";
import starFavorited from "../../assets/icons/elements/star-filled.svg";
import starNotFavorited from "../../assets/icons/elements/star-outline.svg";
import { addNewFav, deleteNewFav } from "../../services/videos";
import formatDate from "../../helpers/FormatDate";

export const VideoPlayer = ({
  video,
  favoriteVideos,
  getFavoriteVideos,
}: VideoType) => {
  const { dataPublicacao, descricao, nome, thumbUrl, url, id } = video;
  formatDate(dataPublicacao);

  const { isAuthenticated } = useAuthenticated();

  const favoriteVideosId = useMemo<string[]>(() => {
    const favoriteVideosIdArr: null | string[] = [];

    if (favoriteVideos.length > 0) {
      favoriteVideos.map((f) => {
        favoriteVideosIdArr.push(f.id);
      });
    }
    return favoriteVideosIdArr;
  }, [favoriteVideos]);

  const handleAddNewFavorite = async (videoId: string) => {
    try {
      addNewFav(videoId);
      getFavoriteVideos();
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const handleRemoveAFavorite = async (videoId: string) => {
    try {
      deleteNewFav(videoId);
      getFavoriteVideos();
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const checkIThatVideoIsAfavoriteVideo = (id: string) => {
    const videoId = favoriteVideosId.filter((fv) => {
      return fv === id;
    });

    if (videoId.length > 0) return true;
    else return false;
  };

  const handleFavorite = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (checkIThatVideoIsAfavoriteVideo(id)) {
      handleRemoveAFavorite(id);
    } else {
      handleAddNewFavorite(id);
    }
  };

  return (
    <>
      <div className="containerVideoDados">
        <div className="tituloo">
          <h1>
            {nome}{" "}
            {isAuthenticated ? (
              <button
                className="favoritee"
                onClick={(e) => handleFavorite(e, id)}
              >
                {checkIThatVideoIsAfavoriteVideo(id) ? (
                  <img src={starFavorited} alt="icon estrela preenchida" />
                ) : (
                  <img
                    src={starNotFavorited}
                    alt="icon estrela não preenchida"
                  />
                )}
              </button>
            ) : (
              <></>
            )}
          </h1>
          <div className="createdAt">
            {formatDate(dataPublicacao)} | {descricao}
          </div>
        </div>
        <div className="v">
          {video.thumbUrl && (
            <ReactPlayer
              muted={true}
              width={"100%"}
              height={"100%"}
              playing={true}
              controls={true}
              url={url}
              light={thumbUrl}
            />
          )}
        </div>
      </div>
    </>
  );
};
