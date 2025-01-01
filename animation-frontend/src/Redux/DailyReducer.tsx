export interface DailyState {
  today: string;
  dark: boolean;
}

const initstate: DailyState = {
  today: '',
  dark: localStorage.getItem('darkMode') === 'true', // 로컬에 상태 가져옴
};

const DailyReducer = (state: DailyState = initstate, action: any) => {
  switch (action.type) {
    case 'setToday':
      return { ...state, today: action.payload };
    case 'setDark':
      localStorage.setItem('darkMode', String(action.payload)); // 저장
      return { ...state, dark: action.payload };

    default:
      return state;
  }
};

export default DailyReducer;
