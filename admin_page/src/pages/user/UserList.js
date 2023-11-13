import React from 'react';
import {
  CustomTable,
  Th1,
  Th3,
  Th4,
  Tr1,
} from '../../styledcomponents/Userlist.styled';

function UserList() {
  function DateTime(fbDate) {
    const date = new Date(fbDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${hours}:${minutes}`;
  }

  return (
    <>
      <CustomTable className="custom-table">
        <thead>
          <Tr1>
            <Th1>
              <input type="checkbox"></input>
            </Th1>
            <Th4>아이디</Th4>
            <Th3>이름</Th3>
            <Th4>최종 접속일</Th4>
            <Th4>가입일</Th4>
            <Th4>관리</Th4>
          </Tr1>
        </thead>
        <tbody>
          {/* {freeBoards.map((data) => (
            <Tr2 key={data.fbNum}>
              <Th1>{data.fbNum}</Th1>
              <Th2
                onClick={() => DetailFreeBoardGo(data.fbNum)}
                style={{ cursor: 'pointer' }}
              >
                {data.fbTitle}
              </Th2>
              <Th3>{data.userid}</Th3>
              <Th4>{DateTime(data.fbDate)}</Th4>
              <Th5>{data.fbReadCount}</Th5>
            </Tr2>
          ))} */}
        </tbody>
      </CustomTable>
    </>
  );
}

export default UserList;
