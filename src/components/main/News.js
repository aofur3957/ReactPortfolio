import { useState, useEffect, useRef } from 'react';

export default function News(props){
  //초기 로딩 시 사용자 컴퓨터에 localStorage에 데이터가 없을 시 임의로 보여줄 초기 데이터

  const defaultData = [
    {title: 'I want to invest in your future', name: 'Sam', content: `i'm interested in your business. we can be good partner. i'll leave my email here. please contact me`, date: '2022/3/6', time: '16:1:24'},
    {title: 'There is some question', name: 'Rose', content: 'I wanna build my house. the budget is about two billion won.', date: '2022/3/6', time: '13:15:27'},
    {title: 'Hello3', name: 'Halie', content: 'Here comes description in detail.', date: '2022/3/5', time: '21:2:5'},
    {title: 'Hello4', name: 'Railar', content: 'Here comes description in detail.', date: '2022/3/1', time: '17:51:53'}
  ];

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

  const [posts] = useState(getLocalItems);
  const [tabIndex, setTabIndex] = useState(0);
  console.log(posts);

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

    localStorage.setItem('posts', JSON.stringify(posts));
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