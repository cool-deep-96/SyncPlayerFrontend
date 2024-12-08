import { useVideo } from "./VideoPlayerContext";
import Controller from "./Controller";
import { Source } from "@/interfaces/interfaces";
import YoutubePlayer from "./YoutubePlayer";

const VideoPlayer = () => {
  const { videoRef, url, source, player, isMuted, playerCreating } = useVideo();

  return (
    <div className="relative flex justify-center items-center h-full w-full">
      <div
        className={`h-full md:h-screen w-full flex items-center justify-center ${
          source === Source.YOUTUBE ? "" : "hidden"
        }`}
      >
        <div
          id="youtubePlayer"
          className={`w-full max-h-screen`}
          style={{ pointerEvents: "none" }}
        ></div>
      </div>
      {source && source === Source.FILE ? (
        <video
          ref={videoRef}
          preload="metadata"
          src={url}
          className="w-fit  md:w-full h-full max-h-screen"
          muted={isMuted}
        ></video>
      ) : (
        <YoutubePlayer />
      )}

      {/* controls */}
      {!playerCreating && (videoRef.current || player.current) && (
        <Controller />
      )}
      {/* controls */}
    </div>
  );
};

export default VideoPlayer;
