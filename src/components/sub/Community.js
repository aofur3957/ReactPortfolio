import {useEffect, useRef, useState} from 'react';

//가상돔 생성함수
export default function Community(){
  let main = useRef(null);
  let [index, setIndex] = useState(0);
  
  //hook은 컴포넌트 안쪽에서 호출
  useEffect(()=>{
    console.log('community 컴포넌트 생성')
    main.current.classList.add('on');

  },[]);

  useEffect(()=>{
    console.log('index값 변경됨');
  }, [index])
  
  //jsx 반환 구문 return
  return (
    <main className="content community" ref={main}>
      <figure></figure>
      <div className="inner">
        <h1>Community</h1>
        <section>
          <button onClick={()=> setIndex(--index)}>-</button>
          <button onClick={()=> setIndex(++index)}>+</button>
          <h2>{index}</h2>
        </section>
      </div>
    </main>
  )
}

/*
  useEffect : 해당 컴포넌트의 생성, 상태값 변경, 소멸이라는 생명주기에 따라 특정구문을 실행할 수 있는 hook
  -- useEffect 첫번째 인수로 콜백함수 등록
  -- useEffect 두번째 인수로는  의존성을 등록
  -- useEffect 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트가 처음 생성될 때 한 번만 호출 가능
*/