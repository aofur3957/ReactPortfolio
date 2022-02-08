import {useEffect, useRef} from 'react';

//가상돔 생성함수
export default function Community(){
  let main = useRef(null);
  
  //hook은 컴포넌트 안쪽에서 호출
  useEffect(()=>{
    main.current.classList.add('on');

  },[]);
  return (
    <main className="content location" ref={main}>
      <figure></figure>
      <div className="inner">
        <h1>Location</h1>
        <section></section>
      </div>
    </main>
  )
}