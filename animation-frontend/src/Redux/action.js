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

export const setBooks = (books) => ({
  type: 'SET_BOOKS',
  payload: books,
});

export const setBookEA = (bookEA) => ({
  type: 'SET_BOOK_EA',
  payload: bookEA,
});

export const setPages = (pages) => ({
  type: 'SET_PAGES',
  payload: pages,
});