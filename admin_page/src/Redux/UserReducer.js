const initstate = {
  UserPageSize: 15,
  UserPage: 0,
  UserArray: [],
};

const UserReducer = (userstate = initstate, action) => {
  switch (action.type) {
    case 'SetUserPageSize':
      return { ...userstate, UserPageSize: action.payload };
    case 'SetUserPage':
      return { ...userstate, UserPage: action.payload };
    case 'SetUserArray':
      return { ...userstate, UserArray: action.payload };
    default:
      return userstate;
  }
};

export default UserReducer;
