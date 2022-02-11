import {useEffect, useRef, useState} from 'react';

export default function Community(){
  const main = useRef(null);
  const input = useRef(null);
  const textarea = useRef(null);
  const showBox = useRef(null);
  const updateInput = useRef(null);
  const updateTextarea = useRef(null);
  const getLocalItems = ()=>{
    let data =  localStorage.getItem('posts');

    if(data){
      return JSON.parse(data);
    }else {
    
    // 로컬 저장소에 데이터가 없을 때
      return [];
    }
  }

  const [posts, setPosts] = useState(getLocalItems)

  const createPost = ()=>{
    const inputVal = input.current.value.trim();
    const textareaVal = textarea.current.value.trim();
    if( !inputVal || !textareaVal || inputVal == ' ' || textareaVal == ' '){
      alert('제목과 본문을 입력하세요');
      return;
    }
    setPosts([ 
      {
        title : input.current.value,
        content: textarea.current.value
      },
      ...posts
    ])
    input.current.value = ' ';
    textarea.current.value = ' ';
  }

  //순번으로 받은 게시글만 삭제하는 함수
  const deletePost = index=>{
    setPosts(
      //기본 배열을 받아서 조건식을 통해 특정 조건이 성립하는 데이터만 필터링해서 다시 새롭게 반환하는 함수
      posts.filter((_, idx) => idx !== index)
      
    )
  }
  //인수로 수정모드 변경할 포스트의 순서값 받아서 해당 순번의 state값만 수정가능한 형태로 정보값 변경
  const enableUpdate = index=>{
    setPosts(
      posts.map((post, idx)=>{
        if(idx === index) post.enableUpdate=true;
        return post;
      })
    )
    console.log(posts);
  }

  const disableUpdate = index=>{
    setPosts(
      posts.map((post, idx)=>{
        if(idx === index) post.enableUpdate=false;
        return post;
      })
    )
    console.log(posts);
  }

  const updatePost = index=>{
    const inputVal2 = updateInput.current.value.trim();
    const textareaVal2 = updateTextarea.current.value.trim();
    if( !inputVal2 || !textareaVal2 || inputVal2 == ' ' || textareaVal2 == ' '){
      alert('제목과 본문을 입력하세요');
      return;
    }
    setPosts(
      posts.map((post, idx)=>{
        if(index === idx){
          post.title = updateInput.current.value;
          post.content = updateTextarea.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    )
  }
  
  useEffect(()=>{
    main.current.classList.add('on');
  },[]);

  
  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
  },[posts])

  return (
    <main className="content community" ref={main}>
      <figure></figure>

      <div className="inner">
        <h1>Community</h1>
        <section>
          <div class="inputBox">
            <input 
            type="text" 
            placeholder = '제목을 입력하세요'
            ref={input}
            /><br />
            <textarea 
              cols="30" 
              rows="10"
              placeholder = '메세지를 입력하세요'
              ref={textarea}
            >
            </textarea><br />
            {/*버튼 눌렀을때 input요소가 참조가되어야함 */}
            
            <button onClick = {()=>{
              input.current.value = ' ';
              textarea.current.value=' ';
            }}>cancel</button>
            <button onClick = {createPost}>create</button>
          </div>

          <div className="showList" ref={showBox}>
            {posts.map((post, idx)=>{
              return (
                <article key={idx}>
                  {
                    post.enableUpdate 
                    ?
                    //수정화면
                    <>
                      <div class="post">
                        <input type="text" defaultValue={post.title} ref={updateInput} /><br />
                        <textarea defaultValue={post.content} ref={updateTextarea}></textarea><br />
                      </div>
                      
                      <div className="btns">
                        <button onClick={()=>updatePost(idx)}>update</button>
                          <button onClick={()=>disableUpdate(idx)}>cancel</button>
                      </div>
                    </>
                    :
                    //출력화면
                    <>
                      <div class="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                      </div>
                      
                      <div className="btns">
                        <button onClick={()=>enableUpdate(idx)}>modify</button>
                          <button onClick={()=>deletePost(idx)}>delete</button>
                      </div>
                    </>
                  }
                </article>
              )
            })}
          </div>
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