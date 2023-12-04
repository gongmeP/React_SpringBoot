import { AnidataTs } from 'src/model/Animation';

export interface FavoriteState {
  FavoriteList: AnidataTs[];
}

const initstate: FavoriteState = {
  FavoriteList: [],
};

const FavoriteReducer = (state: FavoriteState = initstate, action: any) => {
  switch (action.type) {
    case 'setFavoriteList':
      return {
        ...state,
        FavoriteList: action.payload,
      };

    default:
      return state;
  }
};

export default FavoriteReducer;
