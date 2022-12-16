import RootReducer from "./RootReducer";
import thunk from "redux-thunk"
import {applyMiddleware , createStore} from "redux"
import { persistStore, persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage'

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
}

const persistedReducer = persistReducer(persistConfig, RootReducer) // create a persisted reducer

const store = createStore(persistedReducer ,applyMiddleware(thunk));
storage.removeItem('persist:root')

export const  persistor = persistStore(store);
export default store  
  
