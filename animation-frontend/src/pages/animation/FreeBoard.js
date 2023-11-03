import React, { useState } from 'react';
import { useEffect } from 'react';
import store from '../../Redux/store';
import { setFreeBoards } from '../../Redux/action';
import { useSelector } from 'react-redux';

import {
  CustomTable,
  Th1,
  Th2,
  Th3,
  Th4,
  Th5,
  Tr1,
  Tr2,
} from '../../styledcomponents/FreeBoard.styled';

function FreeBoard() {
  const freeBoards = useSelector((state) => state.freeBoards);

  useEffect(() => {
    fetch(`http://localhost:8080/FreeBoard`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch(setFreeBoards(res));
      });
  }, []);

  console.log(freeBoards);

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
      <h1>자유게시판</h1>

      <CustomTable className="custom-table">
        <thead>
          <Tr1>
            <Th1>NO</Th1>
            <Th2>제목</Th2>
            <Th3>글쓴이</Th3>
            <Th4>작성일</Th4>
            <Th5>조회수</Th5>
          </Tr1>
        </thead>
        <tbody>
          {freeBoards.map((data) => (
            <Tr2 key={data.fbNum}>
              <Th1>{data.fbNum}</Th1>
              <Th2>{data.fbTitle}</Th2>
              <Th3>{data.userid}</Th3>
              <Th4>{DateTime(data.fbDate)}</Th4>
              <Th5>{data.fbReadCount}</Th5>
            </Tr2>
          ))}
        </tbody>
      </CustomTable>
    </>
  );
}

export default FreeBoard;
