import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/asscess';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import uploadReducer from './upload/asscess';
import isUpdateReducer from './confim/confrimUpdate';
import searchReducer from './search/asscess';
import filterReducer from './filter/asscess';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['loginReducer']
}

const rootReducers = combineReducers({
  loginReducer: loginReducer,
  uploadReducer: uploadReducer,
  isUpdateReducer: isUpdateReducer,
  searchReducer: searchReducer,
  filterReducer: filterReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export { store, persistor }

