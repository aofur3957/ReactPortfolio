import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { faLine } from "@fortawesome/free-brands-svg-icons"
import Anime from '../../class/anime.js';

export default function Intro({scrolled, pos}){
  const members = useSelector(state=>state.departmentReducer.members);
  const path = process.env.PUBLIC_URL;

  const introCardsWrap = useRef(null);
  const introCards = useRef([]);

  const getItems = ()=>{
    const cards = introCardsWrap.current.querySelectorAll('.introCard');
    let arr = [];

    for(let card of cards){
      arr.push(card);
    }
    introCards.current = arr;
  }

  useEffect(()=>{
    getItems();
  },[])

  return (
    <section id="intro" className="myScroll">
      <div className="inner">
        <div className="about">
          <div className="left">
            <h2 style={
              scrolled >= pos - 300 
              ?
              {opacity: '1'}
              :
              {opacity: '0'}
            }>
              YEARS 
              <span> OF EXPERIENCE</span>
            </h2>
            <strong style={
               scrolled >= pos - 300 
               ?
               {opacity: '1'}
               :
               {opacity: '0'}
            }>24</strong>
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
        <div className="member" ref={introCardsWrap}>
          <h2 style={{transform: `translateX=(${scrolled}px)`}}>Our Member</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam voluptatem, perspiciatis reprehenderit!
          </p>
          <ul>
            {members.map((member, idx)=>{
              if(idx < 3) {
                return (
                  <li key={idx} className="introCard" style={scrolled >= 1100 ? {animationPlayState: 'running'} : {animationPlayState: 'paused'}}>
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
            <li>
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