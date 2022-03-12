import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';
import Anime from '../../class/anime.js';
// 객체 import active prop 지원
export default function Header(props){
  const [isOn, setIsOn] = useState(false);
  const toggleNav = ()=>{
    setIsOn(!isOn);
  }

  return (
    <header className="myScroll">
        <div className="inner">
          <h1><NavLink exact to='/'>LOGO</NavLink></h1>
          
          <Gnb />
          <Mgnb isOn={isOn} />
          
          <div>
            <div className="member">
             <span><NavLink to='/login'>LOGIN</NavLink></span> 
              <span><NavLink to='/join'>JOIN</NavLink></span> 
            </div>
          
              <FontAwesomeIcon icon={faBars} onClick={toggleNav}/>
          </div>

          <nav>

          </nav>
        </div>
    </header>
  )
}

function Gnb(){
  return(
    <ul id="gnb">
      <li><NavLink  to='/department'>Department</NavLink></li>
      <li><NavLink  to='/community'>Community</NavLink></li>
      <li><NavLink  to='/gallery'>Gallery</NavLink></li>
      <li><NavLink  to='/youtube'>Youtube</NavLink></li>
      <li><NavLink  to='/location'>Location</NavLink></li>
    </ul>
  )
}

function Mgnb(props){
  const path = process.env.PUBLIC_URL;

  const appearMgnb = ()=>{
    if(isOn) {
      new Anime()
    }
  }

  return (
    <div className="mGnbContainer" style={props.isOn ? {transform: 'scaleX(1)'} : {transform: 'scaleX(0'}}>
      <ul id="mGnb">
        <li><NavLink to='/department'>Department</NavLink></li>
        <li><NavLink to='/community'>Community</NavLink></li>
        <li><NavLink to='/gallery'>Gallery</NavLink></li>
        <li><NavLink to='/youtube'>Youtube</NavLink></li>
        <li><NavLink to='/location'>Location</NavLink></li>
      </ul>
      <div className="pic">
        <img src={`${path}/img/subImg5.jpg`} />
      </div>
      <ul className="sns">
        <li><NavLink to='#'><FontAwesomeIcon icon={faFacebookF} /></NavLink></li>
        <li><NavLink to='#'><FontAwesomeIcon icon={faTwitter} /></NavLink></li>
        <li><NavLink to='#'><FontAwesomeIcon icon={faYoutube} /></NavLink></li>
      </ul>
    </div>
  )
}
