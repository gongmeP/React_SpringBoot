const initstate = {
  Login_TF: false,
  loginID: null,
  loginUsername: null,
  Ani: [],
  SearchAni: [],
  AniEA: 1,
  pages: 0,
  freeBoards: [],
  freeBoardsEA: 1,
  formData: [],
  AniALLArray: [],
};

const Reducer = (state = initstate, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        Login_TF: true,
        loginID: action.loginID,
        loginUsername: action.loginUsername,
      };
    case 'LOGIN_FAIL':
      return { ...state, Login_TF: false };
    case 'setAni':
      return { ...state, Ani: action.payload };
    case 'setSearchAni':
      return { ...state, SearchAni: action.payload };
    case 'setAniEA':
      return { ...state, AniEA: action.payload };
    case 'SET_PAGES':
      return { ...state, pages: action.payload };
    case 'setFreeBoards':
      return { ...state, freeBoards: action.payload };
    case 'setFreeBoardsEA':
      return { ...state, freeBoardsEA: action.payload };
    case 'setFormData':
      return { ...state, formData: action.payload };
    case 'setAniALLArray':
      return { ...state, AniALLArray: action.payload };
    default:
      return state;
  }
};

export default Reducer;
