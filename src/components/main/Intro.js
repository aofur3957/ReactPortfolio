import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { faLine } from "@fortawesome/free-brands-svg-icons"

export default function Intro(props){
  const members = useSelector(state=>state.departmentReducer.members);
  console.log(members);
  const path = process.env.PUBLIC_URL;
  return (
    <section id="intro" className="myScroll">
      <div className="inner">
        <div className="about">
          <div className="left">
            <h2>
              YEARS 
              <span> OF EXPERIENCE</span>
            </h2>
            <strong>24</strong>
          </div>
          <div className="right">
            <p>
              We are a team of fashion director &amp; designers
              that believe in the value of well-considered design
              and how it can positively impact lives, communities
              and the broader environment!
            </p>
            <NavLink to='/Department'>MORE ABOUT US</NavLink>
          </div>
        </div>
        <div className="member">
          <h2 style={{transform: `translateX=(${props.scrolled}px)`}}>Our Member</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam voluptatem, perspiciatis reprehenderit!
          </p>
          <ul>
            {members.map((member, idx)=>{
              if(idx < 3) {
                return (
                  <li key={idx}>
                    <div className="pic">
                      <img src={`${path}/img/${member.pic}`}  />
                    </div>
                    <h3>{member.name}</h3>
                    <p>{member.comment}</p>
                    <span>{member.position}</span>
                  </li>
                )
              }else {
                return null
              }
            })}
            <li>
              "Our advantage can help you with picking out the best solutions for your projets"
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}