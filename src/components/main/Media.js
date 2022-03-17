import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
import Anime from '../../class/anime.js';

export default function Media({scrolled, pos}){
  //useSelector로 youtubeReducer에 있는 초기 빈배열을 가져옴
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();
  const media = useRef(null);
  const numElems = useRef([]);
  const [counting, setCounting] = useState([
    { id: 0, val: 0},
    { id: 1, val: 0},
    { id: 2, val: 0},
  ]);

  const part = 'snippet';
  const key = 'AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs';
  const num = 10;
  const playlistId = 'PL5zLxdZ1y87VterXQCOaMjCwbf_KXj5Ve';
  const url =  `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${num}`

  //fetchyoutube함수가 호출되면 axios로 받아온 데이터를 dispatch로 reducer에 전달
  const fetchYoutube = async ()=>{
    await axios.get(url).then(json=>{
      // console.log(json)
      dispatch(setYoutube(json.data.items));
    });
  }

  const getNumElem = ()=>{
    const nums = media.current.querySelectorAll('.count strong');
    const numArr = [];

    for(let el of nums){
      numArr.push(el);
    }

    numElems.current = numArr;
  }

  const countingNum = id=>{
    const goal = numElems.current[id].getAttribute('data-num');
    const time = 1000 / goal;
    console.log(time);

    const start = setInterval(()=>{
      if(counting[id].val == goal){
        clearInterval(start);
      }
      setCounting(
        counting.map(el=>
          el.id === id ? {...el, val: el.val++} : el
        )  
      )      
    }, time)

  }

  useEffect(()=>{
    fetchYoutube();
    getNumElem();
    countingNum(0);
    countingNum(1);
    countingNum(2);
  },[]);

  useEffect(()=>{
  },[scrolled])

  return (
    <section id="media" className="myScroll" ref={media}>
      <div className="inner">
        <h2 style={
          scrolled >= pos - 300
          ?
          {opacity: 1, transform: `translateY(0px)`}
          :
          {opacity: 0, transform: `translateY(300px)`}
        }>Our Media</h2>
        <p style={
           scrolled >= pos - 300
           ?
           {opacity: 1, transform: `translateY(0px)`}
           :
           {opacity: 0, transform: `translateY(300px)`}
        }>Progress work flexiable and alway gurantee time-line is our advantage</p>
        <div className="media">
          {vidData.map((vid,idx)=>{
            if( idx < 3){
              return (
                <article key={idx} className="article" style={
                  scrolled >= pos - 300
                  ?
                  {opacity: 1, transform: `translateY(0px)`}
                  :
                  {opacity: 0, transform: `translateY(300px)`}
                }>
                  <div className="pic">
                    <img src={vid.snippet.thumbnails.medium.url} />
                  </div>
                  <div className="des">
                    <h3>Lorem ipsum dolor sit amet consectetur.</h3>
                    <p>Our team will survey your project, collect infor &amp; build quotes</p>
                  </div>
                  <span>{idx < 10 ? `0${idx+1}` : idx
                  +1}</span>
                </article>
              )
            }else{
              return null;
            }
          })}
        </div>
        <div className="count">
          <article>
            <h3>satisfaction <span>clients</span></h3>
            <strong data-num="820">{counting[0].val}</strong>
          </article>
          <article>
            <h3>employees on <span>worldwide</span></h3>
            <strong data-num="650">{counting[1].val}</strong>
          </article>
          <article>
            <h3>projects completed <span>on 60 countries</span></h3>
            <strong data-num="1875">{counting[2].val}</strong>
          </article>
        </div>
        
      </div>
    </section>
  )
}