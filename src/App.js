import Main from './components/main/Main';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Visual from './components/main/Visual';
import Intro from './components/main/Intro';
import News from './components/main/News';

import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';

import './scss/style.scss';
import {Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component = {Main}>
        </Route>
        
        <Route path='/'>
          <Header type={'sub'} />
        </Route>
      </Switch>

      <Route path='/department' component = {Department}></Route>
      <Route path='/community' component = {Community}></Route>
      <Route path='/gallery' component = {Gallery}></Route>
      <Route path='/youtube' component = {Youtube}></Route>
      <Route path='/location' component = {Location}></Route>
      <Route path='/join' component = {Join}></Route>
      

      <Footer />
    </div>
  );
}

export default App;

/*
  각 라우터를 Switch 컴포넌트로 감싸놓으면
  중첩되는 경로가 있을 때 상단에 있는 경로만 적용하고 그 이후는 무시
*/
