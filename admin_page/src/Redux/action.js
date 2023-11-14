export const loginSuccess = (loginID, loginUsername) => {
  return {
    type: 'LOGIN_SUCCESS',
    loginID,
    loginUsername,
  };
};

export const loginFail = () => {
  return {
    type: 'LOGIN_FAIL',
  };
};

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

export const setAniALLArray = (AniALLArray) => ({
  type: 'setAniALLArray',
  payload: AniALLArray,
});

export const setPages = (pages) => ({
  type: 'SET_PAGES',
  payload: pages,
});

export const setFreeBoards = (freeBoards) => ({
  type: 'setFreeBoards',
  payload: freeBoards,
});

export const setFreeBoardsEA = (freeBoardsEA) => ({
  type: 'setFreeBoardsEA',
  payload: freeBoardsEA,
});

export const setFormData = (formData) => ({
  type: 'setFormData',
  payload: formData,
});

export const setGenreArray = (GenreArray) => ({
  type: 'setGenreArray',
  payload: GenreArray,
});

export const setSearchTF = (SearchTF) => ({
  type: 'setSearchTF',
  payload: SearchTF,
});

export const setSearchPages = (SearchPages) => ({
  type: 'setSearchPages',
  payload: SearchPages,
});

export const SetSelectBoardArray = (SelectBoardArray) => ({
  type: 'SetSelectBoardArray',
  payload: SelectBoardArray,
});
