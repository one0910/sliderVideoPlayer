import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'

interface VideoProps {
  link?: string;
}

const Video: React.FC<VideoProps> = (props) => {
  const { link } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let plyr: Plyr | null = null;

    if (Hls.isSupported() && video) {
      const hls = new Hls();
      hls.loadSource(`./videos/${link}.m3u8`);
      hls.attachMedia(video);
      plyr = new Plyr(video, {
        // controls: [
        //   'play-large',
        //   'restart',
        //   'rewind',
        //   'play',
        //   'fast-forward',
        //   'progress',
        //   'current-time',
        //   'duration',
        //   'mute',
        //   'volume',
        //   'captions',
        //   'settings',
        //   'pip',
        //   'airplay',
        //   'download',
        //   'fullscreen',
        // ]
      });

    } else if (video && video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = `./videos/${link}.m3u8`;
      plyr = new Plyr(video, {
        // controls: [
        //   'play-large',
        //   'restart',
        //   'rewind',
        //   'play',
        //   'fast-forward',
        //   'progress',
        //   'current-time',
        //   'duration',
        //   'mute',
        //   'volume',
        //   'captions',
        //   'settings',
        //   'pip',
        //   'airplay',
        //   'download',
        //   'fullscreen',
        // ]
      });
    }
  }, []);

  return (
    <div className="videoContainer">
      <video ref={videoRef} controls={true} poster={`./images/${link}.png`} playsInline />
      {/* <video ref={videoRef} controls={true} playsInline autoPlay={true} /> */}
    </div>
  );
};

export default Video;
