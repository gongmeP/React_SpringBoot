import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoginReducer from './LoginReducer';
import BoardReducer from './BoardReducer';
import FavoriteReducer from './FavoriteReducer';
import DailyReducer from './DailyReducer';
import thunk from 'redux-thunk';
import AniReducer, { AniState } from './AniReducer';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  AniState: AniReducer,
  BoardState: BoardReducer,
  FavoriteState: FavoriteReducer,
  DailyState: DailyReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
