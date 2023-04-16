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
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>,
  document.getElementById('root')
);
