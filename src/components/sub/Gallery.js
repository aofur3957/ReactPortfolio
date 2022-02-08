import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Gallery(){
  let main = useRef(null);
  let [items, setItems] = useState([]);
  let [isPop, setIsPop] = useState(false);
  let [index, setIndex] = useState(0);

  const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
  const method1 = 'flickr.interestingness.getList';
  const num = 5;
  const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;


  useEffect(()=>{
    axios.get(url)
    .then(json=>{
      setItems(json.data.photos.photo);
    })

    console.log(items);

    main.current.classList.add('on');
  },[]);

  return (
   <>
      <main className="content gallery" ref={main}>
        <figure></figure>
        <div className="inner">
          <h1>Gallery</h1>
          <section>
            {items.map((item, idx)=>{
                return (
                  <article key={idx}>
                    <div className="inner">
                      <div className="pic" onClick={()=>{
                        setIsPop(true);
                        setIndex(idx);
                      }}>
                        <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                      </div>
                      <h2>{item.title}</h2>
                    </div>
                </article>
                )
            })}
          </section>
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

