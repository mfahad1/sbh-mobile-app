import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '../modules/Auth/redux/auth';
import counter from '../modules/Counter/redux/counter';
import quotes from '../modules/Quote/redux/quotes';
import history from '../modules/History/redux/history';
import coach from '../modules/Coach/redux/coach';

const reducer = combineReducers({
  auth,
  counter,
  quotes,
  history,
  coach,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export default store;
