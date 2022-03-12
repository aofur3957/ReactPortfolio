import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFlickr } from '../../redux/actions';
import { Virtual, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/virtual';

export default function Pics(props){
    const picData = useSelector(state=>state.flickrReducer.flickr);
    const dispatch = useDispatch();

    const getFlickr = async ()=>{
        const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
        const method1 = 'flickr.interestingness.getList';
        const num = 9;
        const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&
        extras=owner_name&format=json&nojsoncallback=1`;

        await axios.get(url)
        .then(json=>{
            dispatch(setFlickr(json.data.photos.photo));
            console.log(json);
        })

    }

    useEffect(()=>{
        getFlickr();
    },[])

    
    return (
        <section id="pics" className="myScroll">
            <div className="title">
                <div className="inner">
                    <h2>Our Projects</h2>
                </div>
            </div>
            <div className="contents">
                <div className="inner">
                    <Swiper 
                    style={props.scrolled >= 2369 ? {opacity: 1} : {opacity: 0}}
                    modules={[Virtual, Autoplay]} 
                    spaceBetween={0} 
                    slidesPerView={2} 
                    speed={300}
                    loop
                    breakpoints={{
                        350: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 0
                        }
                    }}
                    // autoplay={{
                    //     delay: 2500
                    // }}
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