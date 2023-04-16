import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
import useCounting from '../../hooks/useCounting';

export default function Media({scrolled, pos}){
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();
  const media = useRef(null);
  const part = 'snippet';
  const key = 'AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs';
  const num = 10;
  const playlistId = 'PL5zLxdZ1y87VterXQCOaMjCwbf_KXj5Ve';
  const url =  `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${num}`

  const count = useCounting(124, 5000, scrolled, pos);
  const count2 = useCounting(1148, 5000, scrolled, pos)
  const count3 = useCounting(672, 5000, scrolled, pos)

  let imgCount = 0;

  const getData = async ()=>{
      await axios.get(url)
      .then(json=>{
      dispatch(setYoutube(json.data.items));
      console.log('media 호출!');
    });
  }

  useEffect(()=>{
    if(vidData.length === 0) getData();
  },[]);

  return (
    <section id="media" className="myScroll" ref={media}>
      <div className="inner">
        <h2 style={
          scrolled >= pos - 300
          ?
          {opacity: 1, transform: `translateY(0px)`}
          :
          {opacity: 0, transform: `translateY(300px)`}
        }
        >Our Media</h2>
        <p style={
           scrolled >= pos - 300
           ?
           {opacity: 1, transform: `translateY(0px)`}
           :
           {opacity: 0, transform: `translateY(300px)`}
        }
        >Progress work flexiable and alway gurantee time-line is our advantage</p>
        <div className="media">
          {vidData.map((vid,idx)=>{
            const tit = vid.snippet.title;
            const des = vid.snippet.description;
            if( idx < 3){
              return (
                <article key={idx} className="article" style={
                  scrolled >= pos - 300
                  ?
                  {opacity: 1, transform: `translateY(0px)`}
                  :
                  {opacity: 0, transform: `translateY(300px)`}
                }
                >
                  <div className="pic">
                    <img src={vid.snippet.thumbnails.medium.url} />
                  </div>
                  <div className="des">
                    <h3>{tit.length > 45 ? `${tit.slice(0, 46)}...` : tit}</h3>
                    <p>{des.length > 70 ? `${des.slice(0, 71)}...` : des}</p>
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
            <strong>{count}</strong>
          </article>
          <article>
            <h3>employees on <span>worldwide</span></h3>
            <strong>{count2}</strong>
          </article>
          <article>
            <h3>projects completed <span>on 60 countries</span></h3>
            <strong>{count3}</strong>
          </article>
        </div>
        
      </div>
    </section>
  )
}