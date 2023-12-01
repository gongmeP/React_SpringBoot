export const setAni = (Ani) => ({
  type: 'setAni',
  payload: Ani,
});
export const setSearchAni = (SearchAni) => ({
  type: 'setSearchAni',
  payload: SearchAni,
});

export const setAniEA = (AniEA) => ({
  type: 'setAniEA',
  payload: AniEA,
});
export const setGenreArray = (GenreArray) => ({
  type: 'setGenreArray',
  payload: GenreArray,
});

export const setAniALLArray = (AniALLArray) => ({
  type: 'setAniALLArray',
  payload: AniALLArray,
});

export const setURL = (url) => ({
  type: 'setURL',
  payload: url,
});

export const setReuseEffect = (ReuseEffect) => ({
  type: 'setReuseEffect',
  payload: ReuseEffect,
});

export const setUserViewTatle = (UserViewTatle) => ({
  type: 'setUserViewTatle',
  payload: UserViewTatle,
});
export const setFilterTF = (filterTF) => ({
  type: 'setFilterTF',
  payload: filterTF,
});

export const setAniPage = (AniPage) => ({
  type: 'setAniPage',
  payload: AniPage,
});

export const setReviewUpdateMode = (ReviewUpdateMode) => ({
  type: 'setReviewUpdateMode',
  payload: ReviewUpdateMode,
});
export const setReviewUpdateModeIdAndText = (
  ReviewUpdateModeId,
  ReviewUpdateModeText,
) => ({
  type: 'setReviewUpdateModeIdAndText',
  payload: { Id: ReviewUpdateModeId, Text: ReviewUpdateModeText },
});
