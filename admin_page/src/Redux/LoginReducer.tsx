export interface LoginState {
  Login_TF: boolean;
  loginID: string;
  loginUsername: string;
}

const initstate: LoginState = {
  Login_TF: false,
  loginID: '',
  loginUsername: '',
};

const LoginReducer = (state: LoginState = initstate, action: any) => {
  switch (action.type) {
    case 'loginSuccess':
      return {
        ...state,
        Login_TF: true,
        loginID: action.payload,
        loginUsername: action.payload,
      };
    case 'LOGIN_FAIL':
      return { ...state, Login_TF: false };
    default:
      return state;
  }
};

export default LoginReducer;
