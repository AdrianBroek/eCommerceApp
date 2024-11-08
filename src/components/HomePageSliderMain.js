import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// banner images
import baner1 from '../images/home page baner/letter_14-min.jpg'
import baner2 from '../images/home page baner/pin_12-min.jpg'
import baner3 from '../images/home page baner/tormarch19-min.jpg'
import baner4 from '../images/home page baner/laptop_12-min.jpg'

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';


// import required modules
import { Autoplay, Pagination, Mousewheel } from 'swiper/modules';

export default function HomePageSliderMain() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <section id="homepage-main-slider">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        mousewheel={true}
        speed={300}
        pagination={{
          clickable: true,
        }}
        direction={'vertical'}
        modules={[Autoplay, Pagination, Mousewheel]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><img loading='lazy' src={baner1}/></SwiperSlide>
        <SwiperSlide><img loading='lazy' src={baner2}/></SwiperSlide>
        <SwiperSlide><img loading='lazy' src={baner3}/></SwiperSlide>
        <SwiperSlide><img loading='lazy' src={baner4}/></SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </section>
  );
}
