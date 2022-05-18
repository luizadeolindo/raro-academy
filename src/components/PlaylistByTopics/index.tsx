import React, { useEffect, useState } from "react";
import { PlaylistTitle } from "../PlaylistTitle";
import { PlaylistContainer } from "../PlaylistContainer";
import { SimpleSlider } from "../SimpleSlider";
import { PlaylistByTopicsProps } from "./PlaylistByTopicsTypes";
import { Video } from "../Video";

export const PlaylistByTopics: React.FC<PlaylistByTopicsProps> = ({
  videos,
  handleFavorite,
  checkIThatVideoIsAfavoriteVideo,
}) => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const getTopics = async () => {
      const videoTopics: string[] = [];

      videos.map((v) => {
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

  return (
    <div>
      {topics.map((t) => (
        <div key={t}>
          <PlaylistContainer>
            <PlaylistTitle title={capitalizeFirstLetter(t)} />
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
          </PlaylistContainer>
        </div>
      ))}
    </div>
  );
};
