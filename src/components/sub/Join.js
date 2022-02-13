import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useRef, useState} from 'react';

//가상돔 생성함수
export default function Join(){
  let main = useRef(null);
  //state로 관리할 초기 value값들
  const initVal = {
    userid: '',
    email: '',
    pwd1: '',
    pwd2: '',
    comments: '',
    gender: false,
    interests: false,
    edu: false
  }

  //useState로 초기 value값을 state에 담아서 관리 시작
  const [val, setVal] = useState(initVal);
  //인풋의 인증실패시 출력될 에러메세지를 담을 state생성
  const [err, setErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  //input의 상태값이 변경될때마다 실행될 함수
  const handleReset = ()=>{
    setVal(initVal);
    setErr({});
    setIsSubmit(false);
  }
  
  const handleChange = e=>{
    //input요소의 name값과 value값을 구조분해 할당으로 가져옴
    const {name, value} = e.target;
    //onChange 발생시 기존 val state값을 현재 사용자가 입력하는 값으로 갱신
    setVal({...val, [name]: value});
  }

  const handleSubmit = e=>{
    e.preventDefault();

    //인증처리함수를 호출해서 인증 실패시 
    //err state객체에 에러문구 추가
    setIsSubmit(true);
    setErr(check(val));
  }
  const handleRadio = e=>{
    const {name} = e.target;
    const isChecked = e.target.checked;
    setVal({...val, [name]: isChecked});
  }
  const handleCheck = e=>{
    let isChecked = false;
    const {name} = e.target;
    const inputs = e.target.parentElement.querySelectorAll('input');
    inputs.forEach(el=>{
      if(el.checked) isChecked=true;
    })
    setVal({...val, [name]: isChecked});

  }

  const handleSelect = e=>{
    let {name} = e.target;
    console.log(e.target.options);
    let isSelected = e.target.options[e.target.selectedIndex].value;
    setVal({...val, [name]: isSelected});
  }

  //에러 객체를 반환하는 함수
  const check = val=>{
    let errs = {}
    const eng = /[A-Za-z]/;
    const num = /[0-9]/;
    const spc = /[~!@#$%^&*()_+\]\[]/;

    if(val.userid.length < 5){
      errs.userid = '아이디를 5글자 이상 입력하세요';
    }
    if(val.email.length < 8 || !/@/.test(val.email)){
      errs.email = '이메일 주소는 8글자 이상, @를 포함하세요';
    }
    if(val.pwd1 !== val.pwd2){
      errs.pwd2= '두개의 비밀번호를 동일하게 입력하세요';
    }
    if(val.pwd1 < 5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)){
      errs.pwd1 = '비밀번호는 5글자 이상 영문자,숫자,특수문자를 포함하세요';
    }
    if(val.comments.length < 10){
      errs.comments = '남기는 말을 10글자 이상 입력하세요';
    }
    if(!val.gender){
      errs.gender = '성별을 선택하세요';
    }
    if(!val.interests){
      errs.interests = '취미를 선택하세요'
    }
    if(!val.edu){
      errs.edu = '학력을 선택하세요';
    }

    return errs;
  }

  //hook은 컴포넌트 안쪽에서 호출
  useEffect(()=>{
    main.current.classList.add('on');

  },[]);

  useEffect(()=>{
    console.log(err);
    //err 객체의 key값의 갯수를 반환
    const len = Object.keys(err).length;
    if(len === 0 && isSubmit){
      setSuccess(true);
    }else {
      setSuccess(false);
    }
  },[err]);

  return (
    <main className="content join" ref={main}>
        <figure>
          <div className="inner">
            <h1>JOIN</h1>
            <strong>
              ARTS<br /> 
              CULTURE <br />
              MAGAZINE
            </strong>
            <div class="txt">
              <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda esse eos, ex debitis voluptatem, rem corrupti facilis aspernatur quas in, molestias enim" 
              </p>
              <p>
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi ad rerum nesciunt deserunt, temporibus cupiditate, aperiam nisi ab libero adipisci est. Accusamus at nisi dolor!"
              </p>
            </div>
          </div>
        </figure>
      <div className="inner">
        <h1>JOIN</h1>
        <section>
          {success ? <div class="success">회원가입을 축하합니다.</div> : null}
          <h2>JOIN</h2>
          <p>Welcome to visit our homepage</p>
          <ul>
            <li>
              <span>
                <FontAwesomeIcon icon={faBookReader} />
              </span>
              Verification Identify.
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faPenSquare} />
              </span>
              Insert Info.
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              Completion Join.
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend class="h">회원가입 폼 양식</legend>
              
              <table>
                <caption>ESSENTIAL INFO.</caption>
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="userid">USER ID</label>
                    </th>
                    <td>
                      <input 
                        type="text"
                        id='userid'
                        name='userid'
                        placeholder='아이디를 입력하세요'
                        value={val.userid}
                        onChange={handleChange}
                      />
                      <span className="error">{err.userid}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="email">E-MAIL</label>
                    </th>
                    <td>
                      <input 
                      type="text"
                      id="email"
                      placeholder="이메일 주소를 입력하세요"
                      name = 'email'
                      value={val.email}
                      onChange={handleChange} 
                      />
                      <span className="error">{err.email}</span>
                    </td>
  
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="pwd1">PASSWORD</label>
                    </th>
                    <td>
                      <input
                       type="password"
                       id="pwd1"
                       placeholder="비밀번호를 입력하세요"
                       name="pwd1"
                       value={val.pwd1}
                       onChange={handleChange}
                       />
                       <span className="error">{err.pwd1}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="pwd2">RE PASSWORD</label>
                    </th>
                    <td>
                      <input
                       type="password"
                       id="pwd2"
                       placeholder="비밀번호를 재입력하세요"
                       name="pwd2"
                       value={val.pwd2}
                       onChange={handleChange}
                       />
                       <span className="error">{err.pwd2}</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                        GENDER
                    </th>
                    <td>
                      <label htmlFor="male">Male</label>
                      <input 
                      type="radio"
                      id="male"
                      name="gender"
                      value={val.gender}
                      onChange= {handleRadio}
                      />
                      <label htmlFor="female">Female</label>
                      <input 
                      type="radio"
                      id="female"
                      name="gender"
                      value={val.gender}
                      onChange= {handleRadio}
                      />
                      <span className="error">{err.gender}</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      INTERESTS
                    </th>
                    <td>
                      <label htmlFor="sports">sports</label>
                      <input 
                      type="checkbox"
                      id="sports"
                      name="interests"
                      onChange ={handleCheck}
                      />
                      <label htmlFor="music">music</label>
                      <input 
                      type="checkbox"
                      id="music"
                      name="interests"
                      onChange ={handleCheck}
                      />
                      <label htmlFor="game">game</label>
                      <input 
                      type="checkbox"
                      id="game"
                      name="interests"
                      onChange ={handleCheck}
                      />
                      <span  className="error">{err.interests}</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <label htmlFor="edu">EDUCATION</label>
                    </th>
                    <td>
                      <select name="edu" id="edu" onChange={handleSelect}>
                      <option value="">학력을 선택하세요</option>
                      <option value="elementary-school">초등학교 졸업</option>
                      <option value="middle-school">중학교 졸업</option>
                      <option value="high-school">고등학교 졸업</option>
                      <option value="college">대학교 졸업</option>
                      </select>
                      <span  className="error">{err.edu}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="comments">LEAVE COMMENTS</label>
                    </th>
                    <td>
                      <textarea 
                      name="comments" 
                      id="comments" 
                      value={val.comments}
                      onChange={handleChange}
                      cols="30" 
                      rows="10">
                      </textarea>
                      <span  className="error">{err.comments}</span>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan='2' className="btnSet">
                      <input type="reset" value="cancel" onClick={handleReset}/>
                      <input type="submit" value="send" />
                    </th>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </section>
      </div>
    </main>
  )
}