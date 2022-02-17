import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';
import axios from 'axios';

/*
  redux 작업 흐름
  1 - 전역으로 상태관리할 값을 카테고리별로 reducer 생성
  2 - store에서 reducer 값을 받은 다음에 App 컴포넌트로 값 전달
  3 - store에 관리되는 값을 호출하고 싶은 component에서 useSelector로 호출
  4 - action에는 reducer에 값을 변경할 함수 정의
  5 - 자식컴포넌트에서 store의 reducer 값을 변경 시 action 함수를 호출해서 dispatch로 reducer에 전달
  6 - store에 있는 reducer 값이 변경되면서 해당 store data가 바인딩되는 모든 컴포넌트는 자동적으로 재 랜더링
*/

export default function Department(){
  let main = useRef(null);
  //useSelector hook으로 store의 state값 참조
  const members = useSelector(state=>state.departmentReducer.members);
  //axios로 불러온 배열을 담을 빈배열을 state로 초기화
  // const [members, setMembers] = useState([]);
  //public폴더의 절대값 경로 구함
  const path = process.env.PUBLIC_URL;
  const dispatch = useDispatch();
  //dispatch함수를 반환받읆 useDispatch로부터
  const newMember = [
    {
      "name": "Emily",
      "position": "Designer",
      "pic": "member4.jpg"
    },
    {
        "name": "Michael",
        "position": "Front-End Developer",
        "pic": "member5.jpg"
    },
    {
        "name": "Chang",
        "position": "Back-End Developer",
        "pic": "member6.jpg"
    }
  ];
  // //절대 경로에서부터의 json데이터 url값 구함
  // const url = `${path}/db/department.json`;
  
  useEffect(()=>{
    main.current.classList.add('on');

    //처음 컴포넌트 생성시
    // axios
    //   .get(url)//비동기적으로 데이터 호출
    //   .then(json=>{
    //     console.log(json.data.data);
    //     //전달받은 데이터를 members state에 옮겨담음
    //     setMembers(json.data.data);
    //   })

    //   console.log(members);
  },[]);

  return (
    <main className="content department" ref={main}>
      <figure>
      <div className="inner">
            <div className="wrap">
              <h1>
                  DEPART<br />
                  MENT
              </h1>
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
      <section>
          <div className="inner">
        <h1>ABOUT US</h1>
        <div className="mainpic">

        </div>
        {/* <button onClick={()=>{
          dispatch(setMembers(newMember))
          //action 발행
        }}>
          멤버변경
        </button> */}
        
          <div className="member">
            <div className="left">
              <h2>
                INTERACTIVE 
                <span>ARTIST!</span>
              </h2>
              {members.map((member, idx)=>{
                console.log(member.position)
                return (
                  <div className={`content${idx+1}`}>
                    <article>
                      <img src={`${path}/img/${member.pic}`}  />
                    </article>
                    <p>
                      <span>L</span>
                      orem ipsum, dolor sit amet consectetur adipisicing elit. Similique dolor magni dolorem provident dicta ducimus et veritatis. Incidunt, recusandae eaque.
                      adipisicing elit. Similique dolor magni dolorem provident dicta ducimus et veritatis. Incidunt, recusandae eaque.
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="right">
              <div className="tit">
                {members.map((member, idx)=>{
                  return (
                      <h3>{member.position}</h3>
                  )
                })}
              </div>
              {members.map((member, idx)=>{
                return (
                    <article key={idx} className={`pic${idx
                    +1}`}>
                      <img src={`${path}/img/${member.pic}`}  />
                    </article>
                )
                })}
            </div>
          </div>
        
          
          
          {/* {members.map((data,idx)=>{
            return (
              <article key={idx}>
                <img src={`${path}/img/${data.pic}`}  />
                <h2>{data.name}</h2>
                <p>{data.position}</p>
              </article>
            )
          })} */}
          </div>
        </section>
    </main>
  )
}