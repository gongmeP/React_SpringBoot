export const loginSuccess = (loginID, loginUsername) => {
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
