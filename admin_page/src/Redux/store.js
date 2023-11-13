import { createStore, combineReducers } from 'redux';
import Reducer from './Reducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  AniBoardState: Reducer,
  userState: UserReducer,
});

const store = createStore(rootReducer);

export default store;
