export const loginSuccess = (loginID, loginUsername) => {
  return {
    type: 'LOGIN_SUCCESS',
    loginID,
    loginUsername,
  };
};

export const loginFail = () => {
  return {
    type: 'LOGIN_FAIL',
  };
};

const initstate = {
  Login_TF: false,
  loginID: null,
  loginUsername: null,
};

const Reducer = (state = initstate, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        Login_TF: true,
        loginID: action.loginID,
        loginUsername: action.loginUsername,
      };
    case 'LOGIN_FAIL':
      return { Login_TF: false };
    default:
      return state;
  }
};

export default Reducer;
