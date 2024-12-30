export const loginSuccess = (loginID: string, loginUsername: string) => {
  return {
    type: 'loginSuccess',
    loginID,
    loginUsername,
  };
};

export const loginFail = () => {
  return {
    type: 'LOGIN_FAIL',
  };
};
