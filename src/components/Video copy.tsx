import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoProps {
  link?: string
}

const Video: React.FC<VideoProps> = (props) => {
  const { link } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported() && video) {
      const hls = new Hls();
      // 使用您的 .m3u8 文件路徑
      hls.loadSource(`./videos/${link}.m3u8`);
      hls.attachMedia(video);
      // video.muted = true;
      // video.play();

    } else if (video && video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = `./videos/${link}.m3u8`;
      // video.muted = true;
      // video.play()
      // video.addEventListener("loadedmetadata", function () {
      // });
    }
  }, []);

  return (
    <div className="videoContainer">
      <video ref={videoRef} controls width="100%" autoPlay={true} muted />
      {/* <video ref={videoRef} controls width="100%" autoPlay={true} muted poster={`./images/${link}.png`} /> */}
    </div>
  );
};

export default Video;
