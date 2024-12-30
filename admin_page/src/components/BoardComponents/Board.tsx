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
import store, { RootState } from '../../Redux/store';
import { SetSelectBoardArray } from '../../Redux/BoardAction';
import { useState } from 'react';
import axiosAPI from '../../axiosAPI';
import { BoardTs } from 'src/model/Board';
import BoardDateTime from '../DateTimeComponents/BoardDateTime';

const Board = () => {
  const freeBoards: BoardTs[] = useSelector(
    (state: RootState) => state.BoardState.freeBoards,
  );
  const SelectBoardArray: number[] = useSelector(
    (state: RootState) => state.BoardState.SelectBoardArray,
  );
  const [allCheck, SetAllCheck] = useState(false);

  const navigate = useNavigate();

  const DetailFreeBoardGo = async (fbNum: number) => {
    const res = await axiosAPI.get(`/FreeBoard/ReadCountUp/${fbNum}`);
    window.scrollTo(0, 0);
    navigate(`/detailFreeBoard/${fbNum}`);
  };

  const SelectBoard = (
    e: React.ChangeEvent<HTMLInputElement>,
    fbNum: number,
  ) => {
    if (e.target.checked) {
      store.dispatch(SetSelectBoardArray([...SelectBoardArray, fbNum]));
    } else if (!e.target.checked) {
      store.dispatch(
        SetSelectBoardArray(SelectBoardArray.filter((id) => id !== fbNum)),
      );
    }
  };

  const AllSelectBoard = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      SetAllCheck(e.target.checked);
      const allfbNum = freeBoards.map((data) => data.fbNum);
      store.dispatch(SetSelectBoardArray(allfbNum));
    } else if (!e.target.checked) {
      SetAllCheck(e.target.checked);
      store.dispatch(SetSelectBoardArray([]));
    }
  };

  return (
    <CustomTable className="custom-table">
      <thead>
        <Tr1>
          <Th1>
            <input
              style={{ marginRight: '5px' }}
              type="checkbox"
              id={'ALL'}
              onChange={AllSelectBoard}
              checked={allCheck}
            ></input>
          </Th1>
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
            <Th1>
              <input
                style={{ marginRight: '5px' }}
                type="checkbox"
                id={`${data.fbNum}`}
                onChange={(e) => SelectBoard(e, data.fbNum)}
                checked={SelectBoardArray.includes(data.fbNum)}
              ></input>
            </Th1>
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
