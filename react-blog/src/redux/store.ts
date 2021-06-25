import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { userSlice } from './slice/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};
// 合并多个reducer
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareHandler = (getDefaultMiddleware) => {
  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  ];
  if (process.env.NODE_ENV === 'development') {
    middlewareList.push(logger);
  }
  return middlewareList;
};

const store = configureStore({
  reducer: persistedReducer,
  // 可以添加自己的中间件,比如打印日志的
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware),
  devTools: true,
});

const persistor = persistStore(store);
// 获取全部store数据类型
export type RootState = ReturnType<typeof store.getState>;
// eslint-disable-next-line
export default { store, persistor };
