import React, { useEffect, useState } from "react";
import { PlaylistTitle } from "../PlaylistTitle";
import { PlaylistContainer } from "../PlaylistContainer";
import { SimpleSlider } from "../SimpleSlider";
import { PlaylistByTopicsProps } from "./PlaylistByTopicsTypes";
import { Video } from "../Video";
import Skeleton from "react-loading-skeleton";
import { VideoSkeleton } from "../VideoSkeleton";
import { PlaylistByTopicSkeleton } from "../PlaylistByTopicSkeleton";

export const PlaylistByTopics: React.FC<PlaylistByTopicsProps> = ({
  videos,
  handleFavorite,
  checkIThatVideoIsAfavoriteVideo,
  loading,
}) => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const getTopics = async () => {
      const videoTopics: string[] = [];

      videos.forEach((v) => {
        if (!videoTopics.includes(v.topico)) {
          videoTopics.push(v.topico);
        }
      });

      setTopics(videoTopics);
    };

    getTopics();
  }, [videos]);

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  if (loading) {
    return (
      <div>
        <PlaylistByTopicSkeleton />
      </div>
    );
  }

  return (
    <div>
      {topics.map((t) => (
        <div key={t}>
          <PlaylistContainer>
            <PlaylistTitle title={capitalizeFirstLetter(t)} />
            {loading ? (
              <SimpleSlider>
                <VideoSkeleton />
              </SimpleSlider>
            ) : (
              <SimpleSlider>
                {videos
                  .filter((v) => v.topico === t)
                  .map((video) => (
                    <Video
                      video={video}
                      key={video.id}
                      handleFavorite={handleFavorite}
                      checkIThatVideoIsAfavoriteVideo={
                        checkIThatVideoIsAfavoriteVideo
                      }
                    />
                  ))}
              </SimpleSlider>
            )}
          </PlaylistContainer>
        </div>
      ))}
    </div>
  );
};
