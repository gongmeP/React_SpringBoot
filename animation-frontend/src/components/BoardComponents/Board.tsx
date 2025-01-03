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
} from '../../styledcomponents/FreeBoard.styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import { RootState } from 'src/Redux/store';
import { BoardTs } from 'src/model/Board';
import BoardDateTime from '../DateTimeComponents/BoardDateTime';

const Board = () => {
  const freeBoards: BoardTs[] = useSelector(
    (state: RootState) => state.BoardState.freeBoards,
  );

  const navigate = useNavigate();

  const formData = useSelector((state: RootState) => state.BoardState.formData);
  const DetailFreeBoardGo = async (fbNum: number) => {
    const res = await axiosAPI.get(`/FreeBoard/ReadCountUp/${fbNum}`);
    window.scrollTo(0, 0);
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
            <Th4>
              <BoardDateTime fbDate={data.fbDate}></BoardDateTime>
            </Th4>
            <Th5>{data.fbReadCount}</Th5>
          </Tr2>
        ))}
      </tbody>
    </CustomTable>
  );
};

export default Board;
