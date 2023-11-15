const initstate = {
  Login_TF: false,
  loginID: null,
  loginUsername: null,
};

const LoginReducer = (state = initstate, action) => {
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
    default:
      return state;
  }
};

export default LoginReducer;
