const initstate = {
  UserPageSize: 15,
  UserPage: 0,
  UserArray: [],
  UserArrayEA: 0,
};

const UserReducer = (userstate = initstate, action) => {
  switch (action.type) {
    case 'SetUserPageSize':
      return { ...userstate, UserPageSize: action.payload };
    case 'SetUserPage':
      return { ...userstate, UserPage: action.payload };
    case 'SetUserArray':
      return { ...userstate, UserArray: action.payload };
    case 'SetUserArrayEA':
      return { ...userstate, UserArrayEA: action.payload };
    default:
      return userstate;
  }
};

export default UserReducer;
