import React, { useState } from 'react';
import {
  CustomTable,
  Th1,
  Th3,
  Th4,
  Tr1,
  Tr2,
} from '../../styledcomponents/Userlist.styled';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import store from '../../Redux/store';
import { SetSelectMemberArray } from '../../Redux/UserAcrion';

function UserListItem({ SetReuseEffect, reuseEffect }) {
  const UserArray = useSelector((state) => state.userState.UserArray);
  const SelectMemberArray = useSelector(
    (state) => state.userState.SelectMemberArray,
  );
  function DateTime(fbDate) {
    const date = new Date(fbDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  const deletemember = async (e) => {
    if (window.confirm('! 회원을 삭제 할꺼에요? 정말로? !')) {
      const res = await axiosAPI.put(`/Memberlist/DeleteUpdate/${e.target.id}`);
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

  const SelectMember = (e) => {
    if (e.target.checked) {
      store.dispatch(SetSelectMemberArray([...SelectMemberArray, e.target.id]));
    } else if (!e.target.checked) {
      store.dispatch(
        SetSelectMemberArray(
          SelectMemberArray.filter((id) => id !== e.target.id),
        ),
      );
    }
    console.log(SelectMemberArray);
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
                  id={UserArray.id}
                  onClick={SelectMember}
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
                  onClick={deletemember}
                  id={UserArray.id}
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
}

export default UserListItem;
