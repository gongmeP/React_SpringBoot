import { UserdataTs } from 'src/model/User';

export interface UserState {
  UserPageSize: number;
  UserPage: number;
  UserArray: UserdataTs[];
  UserArrayEA: number;
  UserSearchPage: number;
  UserSearchTF: string;
  SelectMemberArray: number[];
}

const initstate: UserState = {
  UserPageSize: 15,
  UserPage: 0,
  UserArray: [],
  UserArrayEA: 0,
  UserSearchPage: 0,
  UserSearchTF: 'NotSearch',
  SelectMemberArray: [],
};

const UserReducer = (userstate: UserState = initstate, action: any) => {
  switch (action.type) {
    case 'SetUserPageSize':
      return { ...userstate, UserPageSize: action.payload };
    case 'SetUserPage':
      return { ...userstate, UserPage: action.payload };
    case 'SetUserArray':
      return { ...userstate, UserArray: action.payload };
    case 'SetUserArrayEA':
      return { ...userstate, UserArrayEA: action.payload };
    case 'SetUserSearchPage':
      return { ...userstate, UserSearchPage: action.payload };
    case 'SetUserSearchTF':
      return { ...userstate, UserSearchTF: action.payload };
    case 'SetSelectMemberArray':
      return { ...userstate, SelectMemberArray: action.payload };

    default:
      return userstate;
  }
};

export default UserReducer;
