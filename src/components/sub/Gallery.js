//현재 store있는 데이터를 갤러리 컴포넌트에서 초기 렌더링될때에만 쓰이고 있고
// 그 이후부터는 state값에 담아서 gallery 컴포넌트

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Masonry from 'react-masonry-component';


export default function Gallery(){
  const main = useRef(null);
  const frame = useRef(null);
  const input = useRef(null);
  const picData = useSelector(state=>state.flickrReducer.flickr);
  const [items, setItems] = useState(picData);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [enableClick, setEnableClick] = useState(true);
  const [isInterest, setIsInterest] = useState(true);

  const path = process.env.PUBLIC_URL;
  console.log(items);
  
 
  
  const masonryOptions = {
    fitWidth: false,
    gutter: 0,
    itemSelector: '.item',
    transitionDuration: '0.5s'
  }
  
  const getFlickr = async opt=>{
    
    const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
    const method1 = 'flickr.interestingness.getList';
    const method2 = 'flickr.photos.search';
    const num = 25;
    let url = ' ';

    if(opt.type === 'interest'){
      url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
    }
    if(opt.type === 'search'){
      url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${opt.tag}`
    }
    
    await axios.get(url)
    .then(json=>{
      if(json.data.photos.photo.length === 0){
        alert('해당 검색어의 이미지가 없습니다.');
        return;
      }
      setItems(json.data.photos.photo);
    })

    setTimeout(()=>{
      frame.current.classList.add('on');
      setLoading(false);
      setTimeout(()=>{
        setEnableClick(true);
      }, 1000) //frame에 on이 붙어서 올라오는 모션동안 방지
    }, 1000) //masonry ui 모션이 적용되는 시간동안 정지
  }

  const showInterest = ()=>{
    if(enableClick && !isInterest){
      setIsInterest(true);
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove('on');
      getFlickr({
        type: 'interest',
        count: 500
      });
    }
  }

  const showSearchEnter = (e)=>{
    if(e.key !== 'Enter') return;
    let result = input.current.value;
    result = result.trim();
    input.current.value=' ';

    if(result === ''){
      alert('검색어를 입력하세요.');
      return;
    }

    if(enableClick){
      setIsInterest(false);
      setEnableClick(false);
      setLoading(true);
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
      return;
    }

    if(enableClick){
      setIsInterest(false);
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove('on');
      getFlickr({
        type: 'search',
        count: 500,
        tag: result
      });
    }
  }

  useEffect(()=>{
    main.current.classList.add('on');

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
            <div class="txt">
              <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda esse eos, ex debitis voluptatem, rem corrupti facilis aspernatur quas in, molestias enim" 
              </p>
              <p>
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi ad rerum nesciunt deserunt, temporibus cupiditate, aperiam nisi ab libero adipisci est. Accusamus at nisi dolor!"
              </p>
            </div>
            <div className="pic">
              {/* <img src={`${path}/img/subImg5.jpg`} alt="" /> */}
            </div>
        </div>
        </figure>

        <div className="innerWrap">
          <div className="inner">
          <h1 onClick={showInterest}>GALLERY</h1>
            
            <div className="searchBox">
              <input type="text" placeholder="KEYWORD" ref={input} onKeyUp={showSearchEnter} />
              <button onClick={showSearch}>SEARCH</button>
            </div>
            
          
            {loading ? <img className='loading' src={path+'/img/loading.gif'} /> : null }

            <section ref={frame}>
              {/* <Masonry
              elementType={'div'}
              options={masonryOptions}
              > */}
                {items.map((item, idx)=>{
                  console.log(item);
                    return (
                      <article key={idx} className='item'>
                        <div className="inner">
                        <span className="num">{idx < 10 ? `0${idx+1}` : idx+1 }</span>
                          <div className="pic" onClick={()=>{
                            setIsPop(true);
                            setIndex(idx);
                          }}>
                            <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                          </div>
                          <div className="txt">
                            <h2>{item.title}</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, numquam!</p>
                          </div>
                        </div>
                    </article>
                    )
                })}
              {/* </Masonry> */}
            </section>
          </div>
        </div>
      </main>
     
      { isPop ? <Popup /> : null}
   </>
  )

  function Popup(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';

      return ()=> document.body.style.overflow = 'auto';
      
    },[])
    return (
      <aside className="pop">
        <h1>{items[index].title}</h1>
        <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} alt="" />
        <span onClick={()=>{
          setIsPop(false);
        }}>close</span>
      </aside>
    )
  }
}

