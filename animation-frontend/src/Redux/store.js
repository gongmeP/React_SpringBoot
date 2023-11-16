import { combineReducers, createStore } from 'redux';
import LoginReducer from './LoginReducer';
import AniReducer from './AniReducer';
import BoardReducer from './BoardReducer';
import FavoriteReducer from './FavoriteReducer';
import DailyReducer from './DailyReducer';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  AniState: AniReducer,
  BoardState: BoardReducer,
  FavoriteState: FavoriteReducer,
  DailyState: DailyReducer,
});

const store = createStore(rootReducer);

export default store;
