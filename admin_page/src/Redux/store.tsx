import { createStore, combineReducers, applyMiddleware } from 'redux';
import UserReducer from './UserReducer';
import LoginReducer from './LoginReducer';
import AniReducer from './AniReducer';
import BoardReducer from './BoardReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  AniState: AniReducer,
  BoardState: BoardReducer,
  userState: UserReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
