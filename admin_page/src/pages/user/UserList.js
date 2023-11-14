import React from 'react';

import UserListItem from '../../components/UserComponents/UserListItem';
import UserPage from '../../components/UserComponents/UserPage';
import UserSearch from '../../components/UserComponents/UserSerch';

function UserList() {
  return (
    <>
      <UserListItem></UserListItem>
      <UserPage></UserPage>
      <UserSearch></UserSearch>
    </>
  );
}

export default UserList;
