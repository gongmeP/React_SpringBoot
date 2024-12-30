import React from 'react';

import UserListItem from '../../components/UserComponents/UserListItem';
import UserPage from '../../components/UserComponents/UserPage';
import UserSearch from '../../components/UserComponents/UserSerch';
import { Button } from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';
import {
  SetUserArray,
  SetUserArrayEA,
  SetUserSearchTF,
} from '../../Redux/UserAcrion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axiosAPI from '../../axiosAPI';

const UserList = () => {
  const PageSize = useSelector(
    (state: RootState) => state.userState.UserPageSize,
  );
  const Pages = useSelector((state: RootState) => state.userState.UserPage);
  const [reuseEffect, SetReuseEffect] = useState(0);
  const SelectMemberArray = useSelector(
    (state: RootState) => state.userState.SelectMemberArray,
  );

  const userListGo = () => {
    window.location.href = '/userlist';
  };

  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axiosAPI.get(
        `/Memberlist/Page?page=${Pages}&pagesize=${PageSize}`,
      );
      store.dispatch(SetUserArray(res.data.member.content));
      store.dispatch(SetUserArrayEA(res.data.totalPage));
      store.dispatch(SetUserSearchTF('NotSearch'));
    };

    PagesFetch();
  }, [Pages, PageSize, reuseEffect]);

  const selectDelete = async () => {
    if (window.confirm('! 선택된 회원을 삭제 할꺼에요? 정말로? !')) {
      if (SelectMemberArray.length <= 0) {
        alert('삭제할 회원을 선택해주세요.');
        return;
      }
      const res = await axiosAPI.put(
        `/Memberlist/DeleteUpdateSelect/${SelectMemberArray}`,
      );
      if (res.data === '삭제완료') {
        alert('회원이 삭제되었습니다.');
        SetReuseEffect(reuseEffect + 1);
      } else {
        alert('삭제오류');
      }
    } else {
      alert('회원 삭제 취소했습니다.');
    }
  };

  return (
    <>
      <UserListItem
        SetReuseEffect={SetReuseEffect}
        reuseEffect={reuseEffect}
      ></UserListItem>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={userListGo}
          className="btn-primary mb-1"
          style={{ marginRight: '20px', marginTop: '10px' }}
        >
          전체 회원 리스트
        </Button>
        <Button
          onClick={selectDelete}
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
};

export default UserList;
