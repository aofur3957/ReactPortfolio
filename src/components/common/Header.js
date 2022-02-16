import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
// 객체 import active prop 지원
export default function Header(props){
  const [isOn, setIsOn] = useState(false);
  const toggleNav = ()=>{
    setIsOn(!isOn);
  }
  return (
    <header className={props.type}>
        <div className="inner">
          <h1><NavLink exact to='/'>LOGO</NavLink></h1>
          
          <Gnb />
          
          <div>
            <div className="member">
             <span><NavLink to='/login'>LOGIN</NavLink></span> 
              <span><NavLink to='/join'>JOIN</NavLink></span> 
            </div>
          
            <div className="util">
              {/* <button>검색</button> */}
              <FontAwesomeIcon icon={faBars} onClick={toggleNav}/>
            </div>
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
