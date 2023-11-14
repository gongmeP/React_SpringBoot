import React from 'react';

import UserListItem from '../../components/UserComponents/UserListItem';
import UserPage from '../../components/UserComponents/UserPage';
import UserSearch from '../../components/UserComponents/UserSerch';
import { Button } from 'react-bootstrap';

function UserList() {
  const userListGo = () => {
    window.location.href = '/userlist';
  };
  return (
    <>
      <UserListItem></UserListItem>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={userListGo}
          className="btn-primary mb-1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          전체 회원 리스트
        </Button>
        <Button
          onClick={userListGo}
          className="btn-danger mb-1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          선택 회원 전체삭제
        </Button>
      </div>
      <UserPage></UserPage>
      <UserSearch></UserSearch>
    </>
  );
}

export default UserList;
