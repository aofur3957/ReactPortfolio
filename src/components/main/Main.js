import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Media from './Media';
import Btns from './Btns';
import Pics from './Pics';
import Contact from './Contact';
import Anime from '../../class/anime.js';
import { useEffect, useRef , useState } from 'react';

export default function Main() {
    const main = useRef(null); // main element
    const pos = useRef([]); // 각 sec의 offsetTop값의 배열
    const [index, setIndex] = useState(0);
    const [scrolled, setScrolled] = useState(0);

    const settingIndex = index => {
        setIndex(index);
    }

    const getPos = ()=>{
        const secs = main.current.querySelectorAll('.myScroll');
        const arr = [];
        for(let sec of secs) arr.push(sec.offsetTop);
        pos.current = arr;
    }

    const activation = ()=>{
        setScrolled(window.scrollY); 
        const scroll = window.scrollY;
        const btns = main.current.querySelectorAll('#btns li');
        pos.current.map((pos, idx)=>{
            if(scroll >= pos){
                for(let btn of btns) btn.classList.remove('on');
                btns[idx].classList.add('on');
            }
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            getPos()
        }, 500);
        window.addEventListener('scroll', activation);
        window.addEventListener('resize', getPos);
        
        return ()=> {
            window.removeEventListener('resize', getPos);
            window.removeEventListener('scroll', activation);
        }
    },[]);

    useEffect(()=>{
        new Anime(window, {
            prop: 'scroll',
            value: pos.current[index],
            duration: 500
        })
    },[index])

    return (
        <div id="mainWrap" ref={main}>
            <Header />
            <Visual />
            <Intro scrolled={scrolled} pos={pos.current[1]} />
            <Pics scrolled={scrolled} pos={pos.current[2]} />
            <Media scrolled={scrolled} pos={pos.current[3]} />
            <News scrolled={scrolled} pos={pos.current[4]} />
            <Contact />
            <Btns settingIndex={settingIndex} />
        </div>
    );
} 