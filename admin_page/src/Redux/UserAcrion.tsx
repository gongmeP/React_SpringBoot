import { UserdataTs } from 'src/model/User';

export const SetUserPageSize = (UserPageSize: number) => ({
  type: 'SetUserPageSize',
  payload: UserPageSize,
});

export const SetUserPage = (UserPage: number) => ({
  type: 'SetUserPage',
  payload: UserPage,
});

export const SetUserArray = (UserArray: UserdataTs) => ({
  type: 'SetUserArray',
  payload: UserArray,
});

export const SetUserArrayEA = (UserArrayEA: number) => ({
  type: 'SetUserArrayEA',
  payload: UserArrayEA,
});

export const SetUserSearchPage = (UserSearchPage: number) => ({
  type: 'SetUserSearchPage',
  payload: UserSearchPage,
});

export const SetUserSearchTF = (UserSearchTF: string) => ({
  type: 'SetUserSearchTF',
  payload: UserSearchTF,
});

export const SetSelectMemberArray = (SelectMemberArray: number[]) => ({
  type: 'SetSelectMemberArray',
  payload: SelectMemberArray,
});
