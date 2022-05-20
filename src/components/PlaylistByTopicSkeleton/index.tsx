import React from "react";
import { PlaylistContainer } from "../PlaylistContainer";
import { SimpleSlider } from "../SimpleSlider";
import Skeleton from "react-loading-skeleton";
import { VideoSkeleton } from "../VideoSkeleton";

export const PlaylistByTopicSkeleton: React.FC = () => {
  return (
    <div>
      <div>
        <PlaylistContainer>
          <h2 className="playlistTitleSkeleton">
            <Skeleton baseColor="#b5b3e6" width="190px" />
          </h2>

          <SimpleSlider>
            <VideoSkeleton />
          </SimpleSlider>
        </PlaylistContainer>
      </div>
    </div>
  );
};
