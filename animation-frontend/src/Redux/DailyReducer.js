const initstate = {
  today: '',
};

const DailyReducer = (state = initstate, action) => {
  switch (action.type) {
    case 'setToday':
      return { ...state, today: action.payload };
    default:
      return state;
  }
};

export default DailyReducer;
