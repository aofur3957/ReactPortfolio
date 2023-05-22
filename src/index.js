import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store, {Persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Scrolltop  from './scrollRestoration/Scrolltop';

ReactDOM.render(
    <HashRouter>
      <Scrolltop />
      <Provider store={store}> {/* 리액트 컴포넌트에서 스토어를 사용할 수 있도록 provider로 감싸주고  생성한 store를 props로 전달 */}
        <PersistGate loading={null} persistor={Persistor}> {/* provider가 전역 store를 컴포넌트에게 전달하듯이 PersistGate도 영구보존스토어인 persistor를 전달하는 역할을 함 */}
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>,
  document.getElementById('root')
);
