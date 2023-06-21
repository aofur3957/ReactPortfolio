import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setFlickr } from '../../redux/actions';
import { Virtual, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/autoplay';

export default function Pics({scrolled, pos}){
    const picData = useSelector(state=>state.flickrReducer.photos); // useSelector hook을 사용해 중앙 상태값 가져오기
    const dispatch = useDispatch(); // useDispatch hook을 사용해 store의 내장함수인 dispatch 가져오기
    const titElem = useRef(null);
    const pElem = useRef(null);
    const count = useRef(0);
    const base = pos - 300;

    const getFlickr = async ()=>{
        const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
        const method1 = 'flickr.interestingness.getList';
        const num = 9;
        const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&
        extras=owner_name&format=json&nojsoncallback=1`;

        const res = await axios.get(url)
        const photos = res.data.photos.photo;
        dispatch(setFlickr(photos));
    }

    const addText = ()=>{
        let text = 'OUR PROJECTS OUR PROJECTS OUR PROJECTS';   
        const textArr = text.split(' ');
        textArr.push(...textArr);
        text = textArr.join(' ');
        return text;
    }

    const animate = (elem, direction)=>{
        if(count.current >= elem.offsetWidth / 2) count.current = 0;
        count.current += 2;
        elem.style.transform = `translate(${direction * count.current}px)`; 
        requestAnimationFrame(()=>{
            animate(elem, direction);
        });
    }

    useEffect(()=>{
        if(picData.length === 0) getFlickr();
        requestAnimationFrame(()=>{
            animate(titElem.current, -1);
        });
        requestAnimationFrame(()=>{
            animate(pElem.current, 1);
        });
    },[]);

    return (
        <section id="pics" className="myScroll">
            <div className="title">
                <h2 ref={titElem}>{addText()}</h2>
                <div>
                    <p ref={pElem}>{addText()}</p>
                </div>
            </div>
            <div className="contents">
                <div className="inner">
                    <Swiper style={
                        scrolled >= pos - 300 
                        ? 
                        {transform: `scale(1)`, opacity: '1'} 
                        : 
                        {transform: `scale(0)`, opacity: '0'}
                    }
                    modules={[Virtual, Autoplay]} 
                    spaceBetween={0} 
                    speed={300}
                    loop={true}
                    breakpoints={{
                        370: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 0
                        },
                        1180: {
                            slidesPerView: 3,
                            spaceBetween: 0
                        }
                    }}
                    autoplay={{
                        delay: 2500
                    }}
                    virtual={true}
                    >
                        {picData.map((pic, index)=> (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <div className="pic">
                                    <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} />
                                </div>
                                <div className="des">
                                    <span>{pic.ownername}</span>
                                    <h3>{pic.title}</h3>
                                </div> 
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}