import React, { useRef, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Navigation } from "swiper";
import Video from './components/Video';
import { getDeviceType } from './utilities/getDeviceType';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';


export default function App() {
  const swiperRef = useRef(null) as any;
  console.log('navigator => ', navigator)

  useEffect(() => {
    console.log('getDeviceType => ', getDeviceType())
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.on('slideChange', function () {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => video.pause());
        setTimeout(() => {
          const activeVideo = document.querySelector('.swiper-slide-active video') as HTMLVideoElement;
          if (activeVideo && getDeviceType() !== 'iPhone') {
            activeVideo.play()
          }
        }, 500)
      })
    }

  }, [])
  return (
    <>
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        mousewheel={true}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        {['Audi_A4_S4', 'Bugatti_Chiron', 'Range_Rover_Sport_L322', 'Rolls_Royce_Ghost', 'Toyota_Camry_XV70', 'Volkswagen_Golf_7'].map((link, index) => {
          return (
            <SwiperSlide key={index} >
              <Video {...{ link }} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
}
