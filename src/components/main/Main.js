import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Media from './Media';
import Btns from './Btns';
import Pics from './Pics';
import Contact from './Contact';
import Anime from '../../class/anime.js';
import { useEffect, useRef , useState} from 'react';

export default function Main() {
    const main = useRef(null); // main element
    const pos = useRef([]); // 각 sec의 offsetTop값의 배열
    const [index, setIndex] = useState(0);
    const [scrolled, setScrolled] = useState(0);

    const getIndex = index => {
        setIndex(index);
    }

    const getPos = ()=>{
        const secs = main.current.querySelectorAll('.myScroll');
        let arr = [];
        for(let sec of secs) arr.push(sec.offsetTop);
        pos.current = arr;
        console.log(pos);
    }

    const activation = ()=>{
        setScrolled(window.scrollY); //브라우저의 스크롤 값
        let scroll = window.scrollY;
        const btns = main.current.querySelectorAll('#btns li');

        pos.current.map((pos, idx)=>{
            if(scroll >= pos){
                for(const btn of btns) btn.classList.remove('on');

                btns[idx].classList.add('on');
            }
        })
    }

    useEffect(()=>{
        getPos();

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
            <Intro scrolled={scrolled} />
            <Pics scrolled={scrolled} />
            <Media scrolled={scrolled} />
            <News scrolled={scrolled}/>
            <Contact />
            <Btns getIndex={getIndex} />
        </div>
    );
} 