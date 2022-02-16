import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
export default function Info(){
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
    <section></section>
    // <section id="info" className="myScroll">
    //   <div className="inner">
    //     <h1>INFO</h1>
    //     {vidData.map((vid,idx)=>{
    //       return (
    //         <article key={idx}>
    //           <img src={vid.snippet.thumbnails.medium.url} />
    //         </article>
    //       )
    //     })}
        
    //   </div>
    // </section>
  )
}