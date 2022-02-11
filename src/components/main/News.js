import { useState, useEffect } from 'react';

export default function News(){
  //초기 로딩 시 사용자 컴퓨터에 localStorage에 데이터가 없을 시 임의로 보여줄 초기 데이터
  const defaultData = [
    {title: 'Hello1', content: 'Here comes description in detail.'},
    {title: 'Hello2', content: 'Here comes description in detail.'},
    {title: 'Hello3', content: 'Here comes description in detail.'},
    {title: 'Hello4', content: 'Here comes description in detail.'}
  ]

  const getLocalItems = ()=>{
    let data = localStorage.getItem('posts');

    if(data){
      return JSON.parse(data);
    }else{
      return defaultData;
    }
  }

  const [posts] = useState(getLocalItems);

  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
  },[])

  return (
    <section id="news">
      <div className="inner">
        <h1>Recent Post</h1>
        <ul>
        {posts.map((post, idx)=>{
          if(idx < 4) {
            return (
              <li key={idx}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            )
          }
        })}
        </ul>
      </div>
    </section>
  )
}