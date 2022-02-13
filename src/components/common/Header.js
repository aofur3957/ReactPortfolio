import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
// 객체 import active prop 지원
export default function Header(props){

  return (
    <header className={props.type}>
        <div className="inner">
          <h1><NavLink exact to='/'>LOGO</NavLink></h1>
          
          <ul id="gnb">
            <li><NavLink  to='/department'>Department</NavLink></li>
            <li><NavLink  to='/community'>Community</NavLink></li>
            <li><NavLink  to='/gallery'>Gallery</NavLink></li>
            <li><NavLink  to='/youtube'>Youtube</NavLink></li>
            <li><NavLink  to='/location'>Location</NavLink></li>
          </ul>
          
          <div>
            <div className="member">
             <span><NavLink to='/login'>LOGIN</NavLink></span> 
              <span><NavLink to='/join'>JOIN</NavLink></span> 
            </div>
          
            <div className="util">
              {/* <button>검색</button> */}
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </div>
    </header>
  )
}
