import { AnidataTs } from '../model/Animation';

export const setAni = (Ani: AnidataTs[]) => ({
  type: 'setAni',
  payload: Ani,
});
export const setSearchAni = (SearchAni: AnidataTs[]) => ({
  type: 'setSearchAni',
  payload: SearchAni,
});

export const setAniEA = (AniEA: number) => ({
  type: 'setAniEA',
  payload: AniEA,
});
export const setGenreArray = (GenreArray: String[]) => ({
  type: 'setGenreArray',
  payload: GenreArray,
});

export const setAniALLArray = (AniALLArray: AnidataTs[]) => ({
  type: 'setAniALLArray',
  payload: AniALLArray,
});

export const setURL = (url: string) => ({
  type: 'setURL',
  payload: url,
});

export const setReuseEffect = (ReuseEffect: number) => ({
  type: 'setReuseEffect',
  payload: ReuseEffect,
});

export const setUserViewTatle = (UserViewTatle: AnidataTs[]) => ({
  type: 'setUserViewTatle',
  payload: UserViewTatle,
});
export const setFilterTF = (filterTF: boolean) => ({
  type: 'setFilterTF',
  payload: filterTF,
});

export const setAniPage = (AniPage: number) => ({
  type: 'setAniPage',
  payload: AniPage,
});

export const setReviewUpdateMode = (ReviewUpdateMode: boolean) => ({
  type: 'setReviewUpdateMode',
  payload: ReviewUpdateMode,
});
export const setReviewUpdateModeIdAndText = (
  ReviewUpdateModeId: number,
  ReviewUpdateModeText: string,
) => ({
  type: 'setReviewUpdateModeIdAndText',
  payload: { Id: ReviewUpdateModeId, Text: ReviewUpdateModeText },
});
