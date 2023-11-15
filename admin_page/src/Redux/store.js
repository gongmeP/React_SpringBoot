import { createStore, combineReducers } from 'redux';
import UserReducer from './UserReducer';
import LoginReducer from './LoginReducer';
import AniReducer from './AniReducer';
import BoardReducer from './BoardReducer';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  AniState: AniReducer,
  BoardState: BoardReducer,
  userState: UserReducer,
});

const store = createStore(rootReducer);

export default store;
