import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFlip } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import Anime from '../../class/anime.js';

export default function Visual(){
  const path = process.env.PUBLIC_URL;
  return (
    <section id="visual" className="myscroll">
      <Swiper
        modules={[Navigation, Pagination, EffectFlip]}
        effect="flip"
        spaceBetween={0}
        slidesPerView={'auto'}
        loop
        navigation
        pagination={{clickable: true}}
      >
        <SwiperSlide>
          <div className="tit">
            <h1>
              Woman's <br />
              Fashion
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloremque ipsa, deleniti laudantium placeat libero eum quisquam quam dignissimos quas. Odio sapiente exercitationem maiores sequi laudantium voluptatibus nisi..
            </p>
            <NavLink to='#'>SEE PROJECT</NavLink>
          </div>
          <div className="pic">
            <img src={`${path}/img/subImg5.jpg`} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="tit">
            <h1>
              Woman's <br />
              Fashion
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloremque ipsa, deleniti laudantium placeat libero eum quisquam quam dignissimos quas. Odio sapiente exercitationem maiores sequi laudantium voluptatibus nisi..
            </p>
            <NavLink to='#'>SEE PROJECT</NavLink>
          </div>
          <div className="pic">
            <img src={`${path}/img/subImg5.jpg`} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="tit">
            <h1>
              Woman's <br />
              Fashion
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloremque ipsa, deleniti laudantium placeat libero eum quisquam quam dignissimos quas. Odio sapiente exercitationem maiores sequi laudantium voluptatibus nisi..
            </p>
            <NavLink to='#'>SEE PROJECT</NavLink>
          </div>
          <div className="pic">
            <img src={`${path}/img/subImg5.jpg`} />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    
  );
}