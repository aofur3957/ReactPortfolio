import {useEffect, useRef, useState} from 'react';

//가상돔 생성함수
export default function Community(){
  let main = useRef(null);
  const {kakao} = window;
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const path = process.env.PUBLIC_URL;
  //마커 이미지 정보 및 위치정보 값
  var markerOptions =[
    {
        title:"본점", 
        latlng : new kakao.maps.LatLng(35.1659875, 129.1355099),
        imgSrc : path + 'img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점1", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc : 'img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점2", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc : 'img/marker3.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
    }
]; 
  
  
  //hook은 컴포넌트 안쪽에서 호출
  useEffect(()=>{
    const options = {
      center: new kakao.maps.LatLng(35.1659875,129.1355099),
      level: 3
    }

    //카카오 api를 통해 리턴한 인스턴스를 state map에 옮겨담음
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);

    main.current.classList.add('on');

  },[]);
  return (
    <main className="content location" ref={main}>
      <figure></figure>
      <div className="inner">
        <h1>Location</h1>
        <section>
          <div id="map" ref={container}>

          </div>
          <button onClick={()=>{
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
          }}>교통정보 보기</button>
          <button onClick={()=>{
            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
          }}>교통정보 끄기</button>
        </section>
      </div>
    </main>
  )
}