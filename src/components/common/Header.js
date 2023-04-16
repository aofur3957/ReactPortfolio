import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
// 객체 import active prop 지원
export default function Header(props){
  const [isOn, setIsOn] = useState(false);
  const [borderAni, setBorderAni] = useState(false);
  const [textAni, setTextAni] = useState(false);
  const openNav = ()=>{
    setIsOn(true);
    document.body.style.overflow = 'hidden';
    setTimeout(()=>{
      setBorderAni(true);
      setTimeout(()=>{
        setTextAni(true);
      }, 1000);
    }, 500);
  }

  return (
    <header className="myScroll">
        <div className="inner">
          <h1><NavLink exact to='/'>LOGO</NavLink></h1>
          
          <Gnb />
          <Mgnb isOn={isOn} setIsOn={setIsOn} borderAni={borderAni} setBorderAni={setBorderAni} textAni={textAni} setTextAni = {setTextAni}/>
          
          <div className="member">
            <div>
              <span><NavLink to='/login'>LOGIN</NavLink></span> 
              <span><NavLink to='/join'>JOIN</NavLink></span> 
            </div>
            <FontAwesomeIcon icon={faBars} onClick={openNav}/>
          </div>
        </div>
    </header>
  )
}

function Gnb(){
  return(
    <nav id="gnb">
      <ul className="wrap">
        <li><NavLink  to='/department'>Department</NavLink></li>
        <li><NavLink  to='/community'>Community</NavLink></li>
        <li><NavLink  to='/gallery'>Gallery</NavLink></li>
        <li><NavLink  to='/youtube'>Youtube</NavLink></li>
        <li><NavLink  to='/location'>Location</NavLink></li>
      </ul>
    </nav>
  )
}

function Mgnb({isOn, setIsOn, borderAni, setBorderAni, textAni, setTextAni}){
  const path = process.env.PUBLIC_URL;
  const cursor = useRef(null);
  const closeNav = () => {
    setIsOn(false)
    document.body.style.overflow = 'auto';
    setBorderAni(false);
    setTextAni(false);
  }

  const createCursor = e => {
    const pic =  e.currentTarget.children[0];
    cursor.current.style.opacity = 0;
    pic.style.display = `block`;
  }

  const moveCursor = (e, pointer) => {
    const pic = pointer || e.currentTarget.children[0];
    pic.style.left = `${e.clientX + 10}px`
    pic.style.top = `${e.clientY}px`
  }

  const removeCursor = e => {
    const pic =  e.currentTarget.children[0];
    cursor.current.style.opacity = 1;
    pic.style.display = `none`;
  }

  return (
    <div className="mGnbContainer" style={isOn ? {left: 0} : {left: '100%'}} onMouseMove={e => {moveCursor(e, cursor.current)}}>
      <div className="overlay"></div>
      <div className="cursor" ref={cursor}>MENU</div>
      <nav>
        <ul id="mGnb">
          <li onMouseOver={createCursor} onMouseMove={moveCursor} onMouseLeave = {removeCursor} style={borderAni ? {width: `100%`} : {width: `0`}}>
            <div>
              <img src={`${path}/img/subImg1.jpg`} />
            </div>
            <NavLink to='/department' onClick={closeNav} style={textAni ? {transform: `translateY(0)`} : {transform: `translateY(100%)`}}>Department</NavLink>
          </li>
          <li onMouseOver={createCursor} onMouseMove={moveCursor} onMouseLeave = {removeCursor} style={borderAni ? {width: `100%`} : {width: `0`}}>
            <div>
              <img src={`${path}/img/subImg2.jpg`} />
            </div>
            <NavLink to='/community'  onClick={closeNav} style={textAni ? {transform: `translateY(0)`} : {transform: `translateY(100%)`}}>Community</NavLink>
          </li>
          <li onMouseOver={createCursor} onMouseMove={moveCursor} onMouseLeave = {removeCursor} style={borderAni ? {width: `100%`} : {width: `0`}}>
            <div>
              <img src={`${path}/img/subImg3.jpg`} />
            </div>
            <NavLink to='/gallery'  onClick={closeNav} style={textAni ? {transform: `translateY(0)`} : {transform: `translateY(100%)`}}>Gallery</NavLink>
          </li>
          <li onMouseOver={createCursor} onMouseMove={moveCursor} onMouseLeave = {removeCursor} style={borderAni ? {width: `100%`} : {width: `0`}}>
            <div>
              <img src={`${path}/img/subImg4.jpg`} />
            </div>
            <NavLink to='/youtube'  onClick={closeNav} style={textAni ? {transform: `translateY(0)`} : {transform: `translateY(100%)`}}>Youtube</NavLink>
          </li>
          <li onMouseOver={createCursor} onMouseMove={moveCursor} onMouseLeave = {removeCursor} style={borderAni ? {width: `100%`} : {width: `0`}}>
            <div>
              <img src={`${path}/img/subImg5.jpg`} />
            </div>
            <NavLink to='/location'  onClick={closeNav} style={textAni ? {transform: `translateY(0)`} : {transform: `translateY(100%)`}}>Location</NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={closeNav}>
        <span className="h">네비게이션 닫기</span>
      </button>
    </div>
  )
}
