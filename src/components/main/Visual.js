import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFlip } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import Anime from '../../class/anime.js';

export default function Visual(){
  return (
    <figure className="myScroll">
      {/* <Swiper
        modules={[Navigation, Pagination, EffectFlip]}
        effect="flip"
        spaceBetween={0}
        slidesPerView={'auto'}
        loop
        navigation
        pagination={{clickable: true}}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper> */}
    </figure>
  );
}