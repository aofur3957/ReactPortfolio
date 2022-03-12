import {useEffect, useRef, useState} from 'react';
import axios from 'axios';

//가상돔 생성함수
export default function Youtube(){
  let main = useRef(null);
  const [items, setItems] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);

  
  const part = 'snippet';
  const key = 'AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs';
  const num = 12;
  const playlistId = 'PL5zLxdZ1y87VyB6sZ8Ou78aw2L-Uihusz';
  const url =  `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${num}`

  
  
  //hook은 컴포넌트 안쪽에서 호출
  useEffect(()=>{
    axios.get(url)
    .then(json=>{
      console.log(json.data.items);
      setItems(json.data.items);
    })    
    
    main.current.classList.add('on');
  },[]);
  
  return (
    <>
      <main className="content youtube" ref={main}>
        <figure>
          <div className="inner">
              <div className="wrap">
                <h1>YOUTUBE</h1>
                <strong>
                  ARTS<br /> 
                  CULTURE <br />
                  MAGAZINE
                </strong>
              </div>
              <div class="txt">
                <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda esse eos, ex debitis voluptatem, rem corrupti facilis aspernatur quas in, molestias enim" 
                </p>
                <p>
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi ad rerum nesciunt deserunt, temporibus cupiditate, aperiam nisi ab libero adipisci est. Accusamus at nisi dolor!"
                </p>
              </div>
              <div className="pic">
              </div>
          </div>
        </figure>
        <div className="inner">
          <h1>YOUTUBE</h1>
          <section>
            {items.map((item, idx)=>{
              let tit = item.snippet.title;
              let tit_len = tit.length;
      
              let desc = item.snippet.description;
              let desc_len = desc.length;

              let imgSize = '';
              if(item.snippet.thumbnails.maxres){
                imgSize = item.snippet.thumbnails.maxres.url;
              }else {
                imgSize = item.snippet.thumbnails.high.url;
              }

              return (
                <article key={idx}>
                  <div className="inner">
                      <h2>{tit_len > 12 ? tit.substr(0, 12) + '...' : tit}</h2>
                      <span>24/7/18</span>
                      <div className="pic" onClick={()=>{
                        setIsPop(true);
                        setIndex(idx);
                      }}>
                        <img src={imgSize} />
                      </div>
                      <p>{desc_len > 150 ? desc.substr(0, 150)  + '...': desc}</p>
                  </div>
                </article>
              )
            })}
          </section>
        </div>
      </main>
      
      {isPop ? <Popup /> : null}
    </>
  )

  function Popup(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';

      return ()=>{
        document.body.style.overflow = 'auto';
      }
    },[])

    return(
      <aside className="pop">
        <iframe src={"https://www.youtube.com/embed/" +items[index].snippet.resourceId.videoId} width='100%' height= '100%' allowFullScreen></iframe>
        <span onClick={() => setIsPop(false)}>close</span>
      </aside>
    )
  }

}