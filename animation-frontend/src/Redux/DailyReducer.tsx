export interface DailyState {
  today: string;
}

const initstate: DailyState = {
  today: '',
};

const DailyReducer = (state: DailyState = initstate, action: any) => {
  switch (action.type) {
    case 'setToday':
      return { ...state, today: action.payload };
    default:
      return state;
  }
};

export default DailyReducer;
