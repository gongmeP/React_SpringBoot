const initstate = {
  Login_TF: false,
  loginID: null,
  loginUsername: null,
  books: [],
  bookEA: 1,
  pages: 0,
  freeBoards: [],
  freeBoardsEA: 1,
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
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_BOOK_EA':
      return { ...state, bookEA: action.payload };
    case 'SET_PAGES':
      return { ...state, pages: action.payload };
    case 'setFreeBoards':
      return { ...state, freeBoards: action.payload };
    case 'setFreeBoardsEA':
      return { ...state, freeBoardsEA: action.payload };
    default:
      return state;
  }
};

export default Reducer;
