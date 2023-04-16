import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';
import axios from 'axios';

export default function Department(){
  const section = useRef();
  const members = useSelector(state=>state.departmentReducer.members);
  const path = process.env.PUBLIC_URL;
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex ] = useState(0);
  
  useEffect(()=>{
    section.current.classList.add('on');

    axios
      .get(`${path}/db/department.json`) 
      .then(json=>{
        dispatch(setMembers(json.data.data));
      })
  },[]);

  return (
    <main className="content department">
      <figure>
      <div className="inner">
            <div className="wrap">
              <h1>
                  DEPARTMENT
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
            </div>
        </div>
      </figure>
      <section ref={section}>
        <h1>ABOUT US</h1>
        <div className="inner">
          <p>
            moss is a hidden retreat above the bustling salamanca place, tucked within the original warehouses, once home to traders, whalers, publicans, gentlemen and convicts.
          </p>
          <div className="mainpic">
            <img src={`${path}/img/departmentPic.jpg`}></img>
          </div>
          <div className="member">
            <div className="left">
              <h2>
                INTERACTIVE 
                <span>ARTIST!</span>
              </h2>
                {members.map((member, idx)=>{
                  return (
                    <div key={idx} className={tabIndex === idx ? 'on' : null}>
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
                      <h3 key={idx} onClick={()=>{
                        setTabIndex(idx);
                      }}>{member.position}</h3>
                  )
                })}
              </div>
              {members.map((member, idx)=>{
                return (
                    <article key={idx} className={
                      tabIndex === idx ? 'on' : null
                    }>
                      <img src={`${path}/img/${member.pic}`}  />
                    </article>
                )
                })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}