import { useState, useEffect, useRef } from 'react';

export default function News(props){
  //초기 로딩 시 사용자 컴퓨터에 localStorage에 데이터가 없을 시 임의로 보여줄 초기 데이터
  const defaultData = [
    {title: 'Hello1', content: 'Here comes description in detail.'},
    {title: 'Hello2', content: 'Here comes description in detail.'},
    {title: 'Hello3', content: 'Here comes description in detail.'},
    {title: 'Hello4', content: 'Here comes description in detail.'}
  ]
  const news = useRef(null);
  const newsPos = useRef(null);
  const titleEl = useRef(null);
  const tableEl = useRef(null);
  const conEls = useRef([]);

  const getLocalItems = ()=>{
    let data = localStorage.getItem('posts');

    if(data){
      return JSON.parse(data);
    }else{
      return defaultData;
    }
  }

  const [posts] = useState(getLocalItems());
  const [tabIndex, setTabIndex] = useState(0);

  const getConElement = ()=>{
    const cons = news.current.querySelectorAll('.con');
    let arr = [];
    for(let con of cons){
      arr.push(con);
    }
    conEls.current = arr;
    console.log(conEls.current);
  }

  useEffect(()=>{
    newsPos.current = news.current.offsetTop;
    getConElement();
  },[])

  useEffect(()=>{
    if(props.scrolled >= newsPos.current){
      titleEl.current.style.animationPlayState = 'running';

      tableEl.current.style.animationPlayState = 'running';

      conEls.current.map((conEl, idx)=>{
        conEl.style.animationPlayState = 'running';
      })
    }

  },[props.scrolled])
  

  return (
    <section id="news" className="myScroll" ref={news}>
      <div className="inner">
        <div className="left">
          <h1 ref={titleEl}>Recent Post</h1>
          <table ref={tableEl}>
              <tr>
                <th scope="column">name</th>
                <th scope="column">title</th>
                <th scope="column">time</th>
              </tr>
          {posts.map((post, idx)=>{
            if(idx < 4) {
              return (
                <tr key={idx} onClick={()=>{
                  setTabIndex(idx);
                }}>
                  <td>{post.name}</td>
                  <td>{post.title}</td>
                  <td>
                    <span>{post.date}</span>
                    <span>{post.time}</span>
                  </td>
                </tr>
              )
            }
          })}
          </table>
        </div>
        <div className="right">
            {posts.map((post, idx)=>{
              return (
                <div key={idx} className="con" style={idx===tabIndex ? {opacity : '1'} : {opacity : 0}}>
                  <div>
                    {post.content}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}