import { useState, useEffect } from 'react';

export default function News(){
  //초기 로딩 시 사용자 컴퓨터에 localStorage에 데이터가 없을 시 임의로 보여줄 초기 데이터
  const defaultData = [
    {title: 'Hello1', content: 'Here comes description in detail.'},
    {title: 'Hello2', content: 'Here comes description in detail.'},
    {title: 'Hello3', content: 'Here comes description in detail.'},
    {title: 'Hello4', content: 'Here comes description in detail.'}
  ]

  let time = new Date();
  console.log(time);

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
    <section id="news" className="myScroll">
      <div className="inner">
        <div className="left">
          <h1>Recent Post</h1>
          <table>
              <tr>
                <th scope="column">name</th>
                <th scope="column">title</th>
                <th scope="column">e-mail</th>
                <th scope="column">time</th>
              </tr>
          {posts.map((post, idx)=>{
            if(idx < 4) {
              return (
                <tr key={idx}>
                  <td>Mr. Chu</td>
                  <td>{post.title}</td>
                  <td>aofur206@naver.com</td>
                  <td>{`${time.getHours()}시 ${time.getMinutes()}분 ${time.getSeconds()}초`}</td>
                </tr>
              )
            }
          })}
          </table>
        </div>
      </div>
    </section>
  )
}