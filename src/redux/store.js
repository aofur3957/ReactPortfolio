import { createStore } from 'redux';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
// localstorage에 reducer의 state 값을 저장하여 페이지가 새로고침 되어도 state값이 초기화 되지 않도록 하기 위해 스토리지 import
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'main-root',
    storage,
    blacklist: ['departmentReducer', 'youtubeReducer', 'flickrReducer'] // departmentReducer 제외
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, composeWithDevTools());
const Persistor = persistStore(store);

export {Persistor}
export default store;