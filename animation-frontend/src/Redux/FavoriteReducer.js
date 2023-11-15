const initstate = {
  FavoriteList: [],
};

const FavoriteReducer = (state = initstate, action) => {
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
