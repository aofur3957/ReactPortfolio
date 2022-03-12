import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
import Anime from '../../class/anime.js';

export default function Media(props){
  //useSelector로 youtubeReducer에 있는 초기 빈배열을 가져옴
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();

  const part = 'snippet';
  const key = 'AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs';
  const num = 10;
  const playlistId = 'PL5zLxdZ1y87VterXQCOaMjCwbf_KXj5Ve';
  const url =  `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${num}`

  const media = useRef(null);
  const mediaPos = useRef(null);
  const mediaArticle = useRef([]);

  //fetchyoutube함수가 호출되면 axios로 받아온 데이터를 dispatch로 reducer에 전달
  const fetchYoutube = async ()=>{
    await axios.get(url).then(json=>{
      // console.log(json)
      dispatch(setYoutube(json.data.items));
    });
  }

  const getArticle = ()=>{
    let arr = [];
    const articles = media.current.
    querySelectorAll('.article');
    for(let article of articles) {
      arr.push(article);
    }
    mediaArticle.current = arr;
  }

  const getPos = ()=>{
    let pos = media.current.offsetTop;
    mediaPos.current = pos;
    console.log(mediaPos.current);
  }

  const appearMedia = ()=>{
    if(props.scrolled >= mediaPos.current){
      new Anime(mediaArticle.current[0],{
        prop: 'top',
        value: 0,
        duration: 500,
        callback:()=>{
          new Anime(mediaArticle.current[1],{
          prop: 'top',
          value: 0,
          duration: 500,
          callback:()=>{
            new Anime(mediaArticle.current[2],{
              prop: 'top',
              value: 0,
              duration: 500,
            })
          }
        })
      }
    })
  }
}

  useEffect(()=>{
    fetchYoutube();
    getPos();
    getArticle();
  },[]);

  useEffect(()=>{
    appearMedia();
  },[props.scrolled])

  return (
    <section id="media" className="myScroll" ref={media}>
      <div className="inner">
        <h2>Our Media</h2>
        <p>Progress work flexiable and alway gurantee time-line is our advantage</p>
        <div className="media">
          {vidData.map((vid,idx)=>{
            if( idx < 3){
              return (
                <article key={idx} className="article">
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
            <strong>820</strong>
          </article>
          <article>
            <h3>employees on <span>worldwide</span></h3>
            <strong>650</strong>
          </article>
          <article>
            <h3>projects completed <span>on 60 countries</span></h3>
            <strong>1,875</strong>
          </article>
        </div>
        
      </div>
    </section>
  )
}