import apiClient from "../../services/api-client";
import { useMemo } from "react";
import { useAuthenticated } from "../../components/VerifyAuth";
import { PlaylistProps } from "./PlaylistTypes";
import { VideoFavorited } from "../VideoFavorited";
import { PlaylistTitle } from "../PlaylistTitle";
import { PlaylistContainer } from "../PlaylistContainer";
import { Video } from "../Video";
import { SimpleSlider } from "../SimpleSlider";
import { PlaylistByTopics } from "../PlaylistByTopics";

const Playlist: React.FC<PlaylistProps> = ({
  videos,
  favoriteVideos,
  getFavoriteVideos,
}) => {
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
    const url = `/videos/${videoId}/favoritos`;

    try {
      await apiClient.post(url);
      getFavoriteVideos();
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const handleRemoveAFavorite = async (videoId: string) => {
    const url = `/videos/${videoId}/favoritos`;

    try {
      await apiClient.delete(url);
      getFavoriteVideos();
      return;
    } catch (error) {
      console.log("Error to favorite a new video");

      return;
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
      return;
    } else {
      handleAddNewFavorite(id);
      return;
    }
  };

  return (
    <div className="home">
      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Favoritos" />
          {favoriteVideos.length === 0 ? (
            "Você ainda não possui vídeos favoritos a serem exibidos aqui." +
            " Para começar a favoritar, clique no ícone de estrela."
          ) : (
            <SimpleSlider>
              {favoriteVideos.map((video) => (
                <VideoFavorited
                  video={video}
                  key={video.id}
                  handleRemoveAFavorite={handleRemoveAFavorite}
                />
              ))}
            </SimpleSlider>
          )}
        </PlaylistContainer>
      )}

      <PlaylistByTopics
        videos={videos}
        handleFavorite={handleFavorite}
        checkIThatVideoIsAfavoriteVideo={checkIThatVideoIsAfavoriteVideo}
      />
    </div>
  );
};

export default Playlist;
