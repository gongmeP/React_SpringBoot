import React, { useState } from 'react';
import {
  CustomTable,
  Th1,
  Th3,
  Th4,
  Tr1,
  Tr2,
} from '../../styledcomponents/Userlist.styled';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import store, { RootState } from '../../Redux/store';
import { SetSelectMemberArray } from '../../Redux/UserAcrion';
import axiosAPI from '../../axiosAPI';
import { UserdataTs } from 'src/model/User';

interface UserListItem {
  SetReuseEffect: (reuseEffect: number) => void;
  reuseEffect: number;
}

const UserListItem = ({ SetReuseEffect, reuseEffect }: UserListItem) => {
  const UserArray: UserdataTs[] = useSelector(
    (state: RootState) => state.userState.UserArray,
  );
  const SelectMemberArray: number[] = useSelector(
    (state: RootState) => state.userState.SelectMemberArray,
  );
  function DateTime(fbDate: Date) {
    const date = new Date(fbDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  const deletemember = async (IDnum: number) => {
    if (window.confirm('! 회원을 삭제 할꺼에요? 정말로? !')) {
      const res = await axiosAPI.put(`/Memberlist/DeleteUpdate/${IDnum}`);
      if (res.data == '삭제완료') {
        alert('회원이 삭제되었습니다.');
        SetReuseEffect(reuseEffect + 1);
      } else {
        alert('삭제오류');
      }
    } else {
      alert('회원 삭제 취소했습니다.');
    }
  };

  const SelectMember = (
    e: React.ChangeEvent<HTMLInputElement>,
    IDnum: number,
  ) => {
    if (e.target.checked) {
      store.dispatch(SetSelectMemberArray([...SelectMemberArray, IDnum]));
    } else if (!e.target.checked) {
      store.dispatch(
        SetSelectMemberArray(SelectMemberArray.filter((id) => id !== IDnum)),
      );
    }
  };

  return (
    <>
      <CustomTable className="custom-table">
        <thead>
          <Tr1>
            <Th1></Th1>
            <Th4>아이디</Th4>
            <Th3>이름</Th3>
            <Th4>최종 접속일</Th4>
            <Th4>가입일</Th4>
            <Th3>관리</Th3>
          </Tr1>
        </thead>
        <tbody>
          {UserArray.map((UserArray) => (
            <Tr2 key={UserArray.id}>
              <Th1>
                <input
                  type="checkbox"
                  id={`${UserArray.id}`}
                  onChange={(e) => SelectMember(e, UserArray.id)}
                ></input>
              </Th1>
              <Th4>{UserArray.mid}</Th4>
              <Th3>{UserArray.mname}</Th3>
              <Th4>{DateTime(UserArray.logintime)}</Th4>
              <Th4>{DateTime(UserArray.mtime)}</Th4>
              <Th3>
                <Button
                  variant="danger"
                  size="sm"
                  className="mb-2"
                  onClick={() => deletemember(UserArray.id)}
                  id={`${UserArray.id}`}
                >
                  회원 삭제
                </Button>
              </Th3>
            </Tr2>
          ))}
        </tbody>
      </CustomTable>
    </>
  );
};

export default UserListItem;
