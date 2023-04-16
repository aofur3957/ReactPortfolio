import { useState, useEffect } from 'react';

export default function useCounting(num, duration, scrolled, pos){
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  let starting = 0;

  const upCounting = (timestamp)=>{
    if(starting === 0) starting = timestamp;
    const elapsed = timestamp - starting;
    let progress = elapsed / duration;
    if (progress > 1) progress = 1;
    const timer = requestAnimationFrame(time=>{upCounting(time)});
    if(progress >= 1 ) cancelAnimationFrame(timer);
    const number = Math.floor(num * progress);
    setCount(number);
  }

  useEffect(()=>{
    if(scrolled >= pos + 400){
      if(!isCounting) requestAnimationFrame(time=>{upCounting(time)});
      setIsCounting(true);
    }
  },[scrolled]);
  
  return count;
}