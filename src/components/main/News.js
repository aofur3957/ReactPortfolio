import { useState, useEffect, useRef } from 'react';
import Anime from '../../class/anime';

export default function News({scrolled, pos}){
  //초기 로딩 시 사용자 컴퓨터에 localStorage에 데이터가 없을 시 임의로 보여줄 초기 데이터
  const defaultData = [
    {title: `This looks a little bit different`, name: `Rosa`, content: `the clothes i ordered, is it the one like the photo right?`, date: `2023/2/2`, time: `16:1:24`},
    {title: `I don't like the look of this`, name: `chris`, content: 'i am returning the item for a full refund', date: `2023/1/28`, time: `13:15:27`},
    {title: `I've been waiting the whole day`, name: `Halie`, content: `when can i receive the clothes i ordered?`, date: `2023/1/18`, time: `21:2:5`},
    {title: `Help!`, name: `Railar`, content: `The color rain in the wash. how can i get the stain out?`, date: `2023/1/1`, time: `17:51:53`}
  ];
  const getLocalItems = ()=>{
    // let data = localStorage.getItem('posts');
    // if(data){
    //   return JSON.parse(data);
    // }else{
    //   return defaultData;
    // }
    return defaultData;
  }
  const [posts] = useState(getLocalItems());
  const [tabIndex, setTabIndex] = useState(0);
  const [scrollOk, setScrollOk] = useState(true);
  const tableElem = useRef(null);
  const contElem = useRef(null);
  const titElem = useRef(null);

  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
  },[posts]);

  useEffect(()=>{
    if(scrolled >= pos){
      if(scrollOk){
        new Anime(tableElem.current, {
          prop: 'left',
          duration: 1000,
          value: '50',
          callback(){
            new Anime(contElem.current, {
              prop: 'right',
              duration: 1000,
              value: '0',
            });
          }
        });
        new Anime(titElem.current, {
          prop: 'left',
          duration: 1000,
          value: '0',
        });
        setScrollOk(false)
      }
    }
  },[scrolled])

  return (
    <section id="news" className="myScroll">
      <div className="inner">
        <div className="left">
          <h1 ref={titElem}>Recent Post</h1>
          <table ref={tableElem} >
            <thead>
              <tr>
                <th scope="column">name</th>
                <th scope="column">title</th>
                <th scope="column">time</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx)=>{
              if(idx < 4) {
                return (
                  <tr key={idx} onClick={()=>{
                    setTabIndex(idx);
                  }}>
                    <td>{post.name}</td>
                    <td><em>{post.title}</em></td>
                    <td>
                      <span>{post.date}</span>
                      <span>{post.time}</span>
                    </td>
                  </tr>
                )
              }
              })}
            </tbody>
          </table>
        </div>
        <div className="right">
          <div ref={contElem}>
            {posts.map((post, idx)=>{
                return (
                  <div key={idx} className="con" style={idx===tabIndex ? {opacity : '1'} : {opacity : 0}}>
                      <em>{post.content}</em>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}