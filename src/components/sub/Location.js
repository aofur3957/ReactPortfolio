import {useEffect, useRef, useState} from 'react';

//가상돔 생성함수
export default function Community(){
  let main = useRef(null);
  const {kakao} = window;
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const path = process.env.PUBLIC_URL;
  //마커 이미지 정보 및 위치정보 값
  var Info =[
    {
        title:"본점", 
        latlng : new kakao.maps.LatLng(35.1659875, 129.1355099),
        imgSrc : path+'/img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점1", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc :  path+'/img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점2", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc :  path+'/img/marker3.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
    }
  ];
  
  const [mapInfo] = useState(Info);

  
  
  //hook은 컴포넌트 안쪽에서 호출

  //처음 로딩시 한번만 실행
  useEffect(()=>{
    main.current.classList.add('on');
  },[])

  //index state값이 변경될때마다 해당 useEffect를 재실행
  useEffect(()=>{
    const options = {
      center: mapInfo[0].latlng,
      level: 3
    }

    //카카오 api를 통해 리턴한 인스턴스를 state map에 옮겨담음
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);

    //마커출력 인스턴스 생성
    new kakao.maps.Marker({
      map: map,
      position: mapInfo[index].latlng,
      title: mapInfo[index].title,
      image: new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
    })

    map.setCenter(mapInfo[index].latlng);

  },[index]);

  //index state값이 변경될때마다 
  
  
  return (
    <main className="content location" ref={main}>
      <figure></figure>
      <div className="inner">
        <h1>Location</h1>
        <section>
          <div id="map" ref={container}>

          </div>
          
          <nav className="traffic">
            <button onClick={()=>{
              map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            }}>교통정보 보기</button>
            <button onClick={()=>{
              map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
            }}>교통정보 끄기</button>
          </nav>

          <nav className="branch">
            <button onClick={()=>{
              setIndex(0);
            }}>본점</button>
            <button onClick={()=>{
              setIndex(1);
            }}>지점1</button>
            <button onClick={()=>{
              setIndex(2);
            }}>지점2</button>
          </nav>
        
        </section>
      </div>
    </main>
  )
}