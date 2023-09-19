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
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const isActiveClass = videoContainerRef.current?.parentElement?.classList[1]
    let plyr: Plyr | null = null;

    const checkPlayTime = () => {
      if (plyr && isActiveClass === "swiper-slide-active") {
        const currentTime = plyr.currentTime; // 獲取當前播放時間
        if (currentTime > 5) {
          plyr.pause();
          const videoContainer = document.querySelector('.videoContainer');
          if (videoContainer) {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            overlay.style.zIndex = '1000';
            overlay.innerText = '需加入會員才能繼續觀看';
            videoContainer.appendChild(overlay);
          }
          alert("需加入會員才能繼續觀看");
        }
      }
    }

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
      plyr.on('timeupdate', checkPlayTime)

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
      console.log('currentTime => ', plyr.currentTime)
      plyr.on('timeupdate', checkPlayTime)
    }

    // return () => {
    //   if (plyr) {
    //     plyr.off('timeupdate', checkPlayTime);
    //   }
    // };

  }, []);

  return (
    <div className="videoContainer" ref={videoContainerRef}>
      <video ref={videoRef} controls={true} poster={`./images/${link}.png`} playsInline />
      {/* <video ref={videoRef} controls={true} playsInline autoPlay={true} /> */}
    </div>
  );
};

export default Video;
