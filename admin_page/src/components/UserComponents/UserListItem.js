import React from 'react';
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
import store from '../../Redux/store';
import {
  SetUserArray,
  SetUserArrayEA,
  SetUserSearchTF,
} from '../../Redux/UserAcrion';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function UserListItem() {
  const PageSize = useSelector((state) => state.userState.UserPageSize);
  const Pages = useSelector((state) => state.userState.UserPage);
  const UserArray = useSelector((state) => state.userState.UserArray);

  function DateTime(fbDate) {
    const date = new Date(fbDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  useEffect(() => {
    const PagesFetch = async () => {
      const res = await axios.get(
        `http://localhost:8080/Memberlist/Page?page=${Pages}&pagesize=${PageSize}`,
      );
      store.dispatch(SetUserArray(res.data.member.content));
      store.dispatch(SetUserArrayEA(res.data.totalPage));
      store.dispatch(SetUserSearchTF('NotSearch'));
    };

    PagesFetch();
  }, [Pages, PageSize]);

  const deletemember = () => {};
  return (
    <>
      <CustomTable className="custom-table">
        <thead>
          <Tr1>
            <Th1>
              {/* <input type="checkbox"></input>
              전체선택 */}
            </Th1>
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
                <input type="checkbox"></input>
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
