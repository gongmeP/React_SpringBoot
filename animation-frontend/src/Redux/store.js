import { combineReducers, createStore } from 'redux';
import LoginReducer from './LoginReducer';
import AniReducer from './AniReducer';
import BoardReducer from './BoardReducer';
import FavoriteReducer from './FavoriteReducer';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  AniState: AniReducer,
  BoardState: BoardReducer,
  FavoriteState: FavoriteReducer,
});

const store = createStore(rootReducer);

export default store;
