/* eslint-disable no-loop-func */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";


export default function Gallery(){
  const main = useRef(null);
  const frame = useRef(null);
  const input = useRef(null);
  const picData = useSelector(state=>state.flickrReducer.photos);
  const [items, setItems] = useState(picData);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [enableClick, setEnableClick] = useState(true);
  const path = process.env.PUBLIC_URL;
  
  const getFlickr = async opt=>{
    const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
    const method1 = 'flickr.photos.search';
    let url = ' ';

    if(opt.type === 'search'){
      url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${opt.count}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${opt.tag}`
    }
    
    const res = await axios.get(url);
    const photos = res.data.photos.photo;
    if(photos.length === 0){
      alert('해당 검색어의 이미지가 없습니다.');
      return;
    }
    setItems(photos);

    let count = 0;
    const pics = frame.current.querySelectorAll('img');
    for(const pic of pics){
      pic.onload = ()=>{
        count = count + 1;
        if(count === pics.length){
          frame.current.classList.add('on');
          setIsLoading(false);
          setTimeout(()=>{
            setEnableClick(true);
          }, 1000)
        }
      }
    }
  }

  const showSearchEnter = (e)=>{
    if(e.key !== 'Enter') return;
    let result = input.current.value;
    result = result.trim();
    input.current.value='';

    if(result === ''){
      alert('검색어를 입력하세요.');
      return;
    }

    if(enableClick){
      setEnableClick(false);
      setIsLoading(true);
      frame.current.classList.remove('on');
      getFlickr({
        type: 'search',
        count: 500,
        tag: result
      });
    }
  }

  const showSearch = ()=>{
    let result = input.current.value;
    result = result.trim();
    input.current.value=' ';

    if(result === ''){
      alert('검색어를 입력하세요.');
      input.current.focus();
      return;
    }

    if(enableClick){
      setEnableClick(false);
      setIsLoading(true);
      frame.current.classList.remove('on');
      getFlickr({
        type: 'search',
        count: 500,
        tag: result
      });
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      main.current.classList.add('on');
      setIsLoading(false);
    },1000)
  },[]);

  return (
   <>
      <main className="content gallery" ref={main}>
        <figure>
        <div className="inner">
            <div className="wrap">
              <h1>GALLERY</h1>
              <strong>
                ARTS<br /> 
                CULTURE <br />
                MAGAZINE
              </strong>
            </div>
            <div className="txt">
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

        <section className="container">
          <div className="inner">
            <h1>GALLERY</h1>
              
            <div className="searchBox">
              <input type="text" placeholder="KEYWORD" ref={input} onKeyUp={showSearchEnter} />
              <button onClick={showSearch}>SEARCH</button>
            </div>

            <section className="on" ref={frame}>
              {items.map((item, idx)=>{
                  return (
                    <article key={idx} className='item'>
                      <div className="inner">
                        <span className="num">{idx < 10 ? `0${idx+1}` : idx+1 }</span>
                        <div className="pic" onClick={()=>{
                          setIsPop(true);
                          setIndex(idx);
                        }}>
                          <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`} />
                        </div>
                        <div className="txt">
                          <h2>{item.title}</h2>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, numquam!</p>
                        </div>
                      </div>
                  </article>
                  )
              })}
            </section>
          </div>
        </section>
        { isPop ? <Popup /> : null}
      </main>
      { isLoading ? <Loading /> : null}
   </>
  )

  function Loading(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';
      return ()=>document.body.style.overflow= 'auto';
    },[])
    return(
      <div className="loading">
        <img alt='' src={`${path}/img/loading.gif`} />
      </div>
    )
  }

  function Popup(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';
      return ()=> document.body.style.overflow = 'auto';
    },[])
    return (
      <aside className="pop">
        <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} alt="" />
        <button onClick={()=>{
          setIsPop(false);
          console.log(isPop);
        }}>
          <span className="h">close</span>
        </button>
      </aside>
    )
  }
}

