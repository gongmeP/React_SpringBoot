import React from 'react';
import {
  CustomTable,
  Th1,
  Th2,
  Th3,
  Th4,
  Th5,
  Tr1,
  Tr2,
} from '../styledcomponents/FreeBoard.styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DetailFreeBoard from '../pages/FreeBoard/DetailFreeBoard';

function Board() {
  const freeBoards = useSelector((state) => state.freeBoards);
  function DateTime(fbDate) {
    const date = new Date(fbDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${hours}:${minutes}`;
  }

  const navigate = useNavigate();

  const DetailFreeBoardGo = (fbNum) => {
    navigate(`/detailFreeBoard/${fbNum}`);
  };

  return (
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
        ))}
      </tbody>
    </CustomTable>
  );
}

export default Board;
