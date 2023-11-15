const initstate = {
  Ani: [],
  SearchAni: [],
  AniEA: 1,
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
};

const AniReducer = (state = initstate, action) => {
  switch (action.type) {
    case 'setAni':
      return { ...state, Ani: action.payload };
    case 'setSearchAni':
      return { ...state, SearchAni: action.payload };
    case 'setAniEA':
      return { ...state, AniEA: action.payload };
    case 'setAniALLArray':
      return { ...state, AniALLArray: action.payload };
    case 'setGenreArray':
      return { ...state, genreArray: action.payload };
    default:
      return state;
  }
};

export default AniReducer;
