import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'main-root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

//store를 생성시 reducer로 전달된 값을 적용;]
const store = createStore(persistedReducer, applyMiddleware());
const Persistor = persistStore(store);

export {Persistor}
export default store;