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
    <section id="visual">
      {/* <div className="toggle">
      <span>W</span>
        <div className="btn" onClick={()=>{
          
        }}>
          <span></span>
        </div>
        <span>B</span>
      </div> */}
      <Swiper
        modules={[Navigation, Pagination, EffectFlip]}
        effect="flip"
        spaceBetween={0}
        slidesPerView={'auto'}
        autoplay={true}
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
            <img src={`${path}/img/mainVisual1.jpg`} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="tit">
            <h1>
              Man's <br />
              Fashion
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloremque ipsa, deleniti laudantium placeat libero eum quisquam quam dignissimos quas. Odio sapiente exercitationem maiores sequi laudantium voluptatibus nisi..
            </p>
            <NavLink to='#'>SEE PROJECT</NavLink>
          </div>
          <div className="pic">
            <img src={`${path}/img/mainVisual2.jpg`} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="tit">
            <h1>
              Young <br />
              Fashion
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloremque ipsa, deleniti laudantium placeat libero eum quisquam quam dignissimos quas. Odio sapiente exercitationem maiores sequi laudantium voluptatibus nisi..
            </p>
            <NavLink to='#'>SEE PROJECT</NavLink>
          </div>
          <div className="pic">
            <img src={`${path}/img/mainVisual3.jpg`} />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    
  );
}