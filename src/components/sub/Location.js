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
        title:"INCHEON", 
        latlng : new kakao.maps.LatLng(35.1659875, 129.1355099),
        imgSrc : path+'/img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"SONGPA", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc :  path+'/img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"GANGNAM", 
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

    container.current.innerHTML = '';

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
    
    //순서 state값이 변경될때마다 맵의 중앙 위치를 다시 렌더링
    map.setCenter(mapInfo[index].latlng); 
    const mapSet = ()=> map.setCenter(mapInfo[index].latlng);

    //브라우저 리사이즈시 마커 위치를 중앙배치
    window.addEventListener('resize', mapSet);
    // 해당 컴포넌트가 재 랜더링 될때마다 기존 window객체에 등록된 함수를 다시 제거

    const mapType = new kakao.maps.MapTypeControl();
    map.addControl(mapType, kakao.maps.ControlPosition.TOPRIGHT);

    map.setZoomable(false);
    
    return ()=> window.removeEventListener('resize', mapSet);

  
  },[index]);

  //index state값이 변경될때마다 
  
  
  return (
    <main className="content location" ref={main}>
      <figure>
        <div className="inner">
            <h1>LOCATION</h1>
            <strong>
              ARTS<br /> 
              CULTURE <br />
              MAGAZINE
            </strong>
            <div class="txt">
              <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda esse eos, ex debitis voluptatem, rem corrupti facilis aspernatur quas in, molestias enim" 
              </p>
              <p>
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi ad rerum nesciunt deserunt, temporibus cupiditate, aperiam nisi ab libero adipisci est. Accusamus at nisi dolor!"
              </p>
            </div>
        </div>
      </figure>
        <section>
          <div className="contact">
            <div className="inner">
              <div className="info">
                <h1>CONTACT US</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor consequuntur sint ducimus aspernatur ipsam, odit eum earum in quae, esse nobis fugit blanditiis, iure cumque? Laudantium sit enim consectetur illum!
                </p>
                <article>
                  <h3>ADDRESS</h3>
                  <p>
                    Ellabenesu St. lusanne
                    VA 2255-1. CANADA
                  </p>
                </article>
                <article>
                  <h3>OPENING HOURS</h3>
                  <dl>
                    <div>
                      <dt>Monday to Friday:</dt>
                      <dd>10am to 7pm</dd>
                    </div>
                    <div>
                      <dt>Satuday:</dt>
                      <dd>10am to 4pm</dd>
                    </div>
                    <div>
                      <dt>Sunday:</dt>
                      <dd>10am to 4pm</dd>
                    </div>
                  </dl>
                </article>
                <article>
                  <h3>EMAIL</h3>
                  <p>ellesaluke@gmail.com</p>
                </article>
                <article>
                  <h3>PHONE</h3>
                  <p>600-3421-0988</p>
                </article>
              </div>
              <form className="form">
                <fieldset>
                  <legend>Drop us a line</legend>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, numquam.</p>
                  <input type="text" id="name" name="name" placeholder="Your Name" />
                  <input type="email" id="email" name="email" placeholder="Your Email" />
                  <input type="text" id="message" name="message" placeholder="Message"/>
                  <button>send</button>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="store">
            <div class="inner">
              <h2>LOCATION</h2>
              <nav className="branch">
              {mapInfo.map((data, idx)=>{
                return <button key={idx} onClick={()=>setIndex(idx)}>{data.title}</button>
              })}
              </nav>
            </div>
            
            <div id="map" ref={container}>
            </div>
            
            <div className="inner">
              <nav className="traffic">
                <button onClick={()=>{
                  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                }}>TRAFFIC ON</button>
                <button onClick={()=>{
                  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
                }}>TRAFFIC OFF</button>
              </nav>
            </div>
            
  
          </div>
        
        </section>
    </main>
  )
}