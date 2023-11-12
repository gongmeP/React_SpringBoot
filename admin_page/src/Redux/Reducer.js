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
  genreArray: {
    genre: [
      '판타지',
      '액션',
      '개그',
      '미스터리',
      '로맨스',
      '모험',
      'SF',
      '스포츠',
      '아이돌',
      '드라마',
    ],
  },
  SearchTF: '',
  SearchPages: 0,
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
    case 'setGenreArray':
      return { ...state, genreArray: action.payload };
    case 'setSearchTF':
      return { ...state, SearchTF: action.payload };
    case 'setSearchPages':
      return { ...state, SearchPages: action.payload };
    default:
      return state;
  }
};

export default Reducer;
