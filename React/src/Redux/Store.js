//액션
export const increase = (username) => ({
  type: "INCREMENT",
  payload: { username },
});
export const decrease = () => ({ type: "DECREMENT" });

// 상태

const initstate = {
  user: { username: "park" },
  number: 1,
};

//액션의 결과
// state 는 현재 상태. 초기값
// action 은 디스패치된 액션
const reducer = (state = initstate, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        number: state.number + 1,
        user: { username: action.payload.username },
      };
    case "DECREMENT":
      return { number: state.number - 1, user: state.user };
    default:
      return state;
  }
};

export default reducer;
