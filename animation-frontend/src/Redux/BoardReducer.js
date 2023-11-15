const initstate = {
  pages: 0,
  freeBoards: [],
  freeBoardsEA: 1,
  formData: [],
  SearchTF: '',
  SearchPages: 0,
};

const BoardReducer = (state = initstate, action) => {
  switch (action.type) {
    case 'SET_PAGES':
      return { ...state, pages: action.payload };
    case 'setFreeBoards':
      return { ...state, freeBoards: action.payload };
    case 'setFreeBoardsEA':
      return { ...state, freeBoardsEA: action.payload };
    case 'setFormData':
      return { ...state, formData: action.payload };
    case 'setSearchTF':
      return { ...state, SearchTF: action.payload };
    case 'setSearchPages':
      return { ...state, SearchPages: action.payload };
    default:
      return state;
  }
};

export default BoardReducer;
