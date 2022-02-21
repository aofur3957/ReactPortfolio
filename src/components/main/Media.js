import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
export default function Media(){
  //useSelector로 youtubeReducer에 있는 초기 빈배열을 가져옴
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();

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

  useEffect(()=>{
    fetchYoutube();
  },[]);

  return (
    <section id="media" className="myScroll">
      <div className="inner">
        <h2>Our Media</h2>
        <p>Progress work flexiable and alway gurantee time-line is our advantage</p>
        <div className="media">
          {vidData.map((vid,idx)=>{
            if( idx < 3){
              return (
                <article key={idx}>
                  <img src={vid.snippet.thumbnails.medium.url} />
                  <h3>Lorem ipsum dolor sit amet consectetur.</h3>
                  <p>Our team will survey your project, collect infor &amp; build quotes</p>
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