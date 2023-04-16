export default function Btns({ settingIndex }){
  return (
    <ul id="btns">
      <li className="on" onClick={()=>settingIndex(0)}></li>
      <li onClick={()=>settingIndex(1)}></li>
      <li onClick={()=>settingIndex(2)}></li>
      <li onClick={()=>settingIndex(3)}></li>
      <li onClick={()=>settingIndex(4)}></li>
    </ul>
  )
}