import Skeleton from "react-loading-skeleton";

export const VideoSkeleton = () => {
  return (
    <div className="videoContainer">
      <div className="videoThumb" style={{ background: "none" }}>
        <Skeleton baseColor="#b5b3e6" height="100%" />
      </div>
      <p className="videoName">
        <Skeleton baseColor="#b5b3e6" />
      </p>
    </div>
  );
};
