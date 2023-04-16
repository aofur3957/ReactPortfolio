import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setMembers } from '../../redux/actions'
import axios from 'axios';

export default function Intro({scrolled, pos}){
  const members = useSelector(state=>state.departmentReducer.members);
  const path = process.env.PUBLIC_URL;
  const [scrollEnable, setScrollEnable] = useState(true);
  const paragraph = useRef(null);
  const txtLetter = useRef(null);
  const [txtIdx, setTxtIdx] = useState(0);
  const dispatch = useDispatch();

  const getData = ()=>{
    axios.get(`${path}/db/department.json`)
    .then(json=>{
      dispatch(setMembers(json.data.data));
    })
  }

  const typingInit = ()=>{
    let letter = paragraph.current.innerText;
    txtLetter.current = letter;

    if(txtIdx === 0){
      paragraph.current.innerHTML = '';
    }
  }

  const typing = ()=>{
    if(txtIdx === txtLetter.current.length){
      return;
    }
    setTimeout(()=>{
      paragraph.current.innerHTML += `<span>${txtLetter.current[txtIdx]}</span>`
      paragraph.current.querySelectorAll('span')[txtIdx].style.animation = 'typing 0.1s infinite both';
      setTimeout(()=>{
        if(txtIdx + 1 < txtLetter.current.length){
          paragraph.current.querySelectorAll('span')[txtIdx].style.animation = '';
        }
      },100)
      setTxtIdx(txtIdx + 1);
    }, 100)
  }

  useEffect(()=>{
    getData();
    typingInit();
  },[])

  useEffect(()=>{
    if(scrolled >= pos - 300){
      if(scrollEnable){ // scrolled가 pos-300 값이 되는 순간 typing 함수가 한 번만 실행되도록 함
        setScrollEnable(false);
        typing(); 
      }
    }
  },[scrolled])

  useEffect(()=>{
    if(txtIdx >= 1) typing();
  },[txtIdx])

  return (
    <section id="intro" className="myScroll">
      <div className="inner">
        <div className="about">
          <div className="left">
            <h2 style={
              scrolled >= pos - 300 
              ?
              {opacity: '1', transform: `translateY(0px)`}
              :
              {opacity: '0', transform: `translateY(50px)`}
            }
            >
              YEARS 
              <span> OF EXPERIENCE</span>
            </h2>
            <strong style={
               scrolled >= pos - 300 
               ?
               {opacity: '1', transform: `translateY(0px)`}
               :
               {opacity: '0', transform: `translateY(50px)`}
            }
            >24</strong>
          </div>
          <div className="right">
            <p ref={paragraph}>
              We are a team of fashion director &amp; designers
              that believe in the value of well-considered design
              and how it can positively impact lives communities
              and the broader environment!
            </p>
            <NavLink to='/Department'>MORE ABOUT US</NavLink>
          </div>
        </div>
        <div className="member">
          <h2 style={
            scrolled >= pos + 300
            ?
            {opacity: '1', transform: `translateY(0px)`}
            :
            {opacity: '0', transform: `translateY(50px)`}
          }
          >Our Member</h2>
          <p style={
              scrolled >= pos + 300
             ?
             {opacity: '1', transform: `translateY(0px)`}
             :
             {opacity: '0', transform: `translateY(50px)`}
          }
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam voluptatem, perspiciatis reprehenderit!
          </p>
          <ul>
            {members.map((member, idx)=>{
              if(idx < 3) {
                return (
                  <li key={idx} className="introCard" style={
                    scrolled >= pos + 500
                    ?
                    {transform: `rotateY(0deg)`, opacity: `1`}
                    :
                    {transform: `rotateY(-180deg)`, opacity: `1`}
                  }
                  >
                    <article>
                      <div className="pic">
                        <img src={`${path}/img/${member.pic}`}  />
                      </div>
                      <h3>{member.name}</h3>
                      <p>{member.comment}</p>
                      <span>{member.position}</span>
                    </article>
                  </li>
                )
              }else {
                return null
              }
            })}
            <li className="introCard" style={
               scrolled >= pos + 500 
               ? 
               {transform: `rotateY(0deg)`, opacity: `1`} 
               : 
               {transform: `rotateY(-180deg)`, opacity: `0`}
            }>
              <article>
                "Our advantage can help you with picking out the best solutions for your projets"
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}