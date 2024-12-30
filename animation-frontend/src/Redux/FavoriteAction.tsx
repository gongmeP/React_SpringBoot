import { AnidataTs } from 'src/model/Animation';

export const setFavoriteList = (FavoriteList: AnidataTs) => ({
  type: 'setFavoriteList',
  payload: FavoriteList,
});
