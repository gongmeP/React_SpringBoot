import { AnidataTs } from '../model/Animation';

export interface AniState {
  Ani: AnidataTs[];
  SearchAni: AnidataTs[];
  AniEA: number;
  AniALLArray: AnidataTs[];
  genreArray: {
    genre: string[];
  };
  url: string;
  ReuseEffect: number;
  UserViewTatle: AnidataTs[];
  filterTF: boolean;
  AniPage: number;
  ReviewUpdateMode: boolean;
  ReviewUpdateModeId: number;
  ReviewUpdateModeText: string;
}

const initstate: AniState = {
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
  url: 'http://localhost:8080',
  ReuseEffect: 0,
  UserViewTatle: [],
  filterTF: false,
  AniPage: 0,
  ReviewUpdateMode: false,
  ReviewUpdateModeId: 0,
  ReviewUpdateModeText: '',
};

const AniReducer = (state: AniState = initstate, action: any) => {
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
    case 'setURL':
      return { ...state, url: action.payload };
    case 'setReuseEffect':
      return { ...state, ReuseEffect: action.payload };
    case 'setUserViewTatle':
      return { ...state, UserViewTatle: action.payload };
    case 'setFilterTF':
      return { ...state, filterTF: action.payload };
    case 'setAniPage':
      return { ...state, AniPage: action.payload };
    case 'setReviewUpdateMode':
      return { ...state, ReviewUpdateMode: action.payload };
    case 'setReviewUpdateModeIdAndText':
      return {
        ...state,
        ReviewUpdateModeId: action.payload.Id,
        ReviewUpdateModeText: action.payload.Text,
      };
    default:
      return state;
  }
};
export default AniReducer;
