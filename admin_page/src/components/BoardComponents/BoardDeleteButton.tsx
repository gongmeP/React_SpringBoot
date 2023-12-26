import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';
import axiosAPI from 'src/axiosAPI';
import {
  BoardButtonBox,
  BoardButtonWirte,
} from 'src/styledcomponents/FreeBoard.styled';

interface BoardDeleteButtonProp {
  SetReuseEffect: (reuseEffect: number) => void;
}
const BoardDeleteButton = ({ SetReuseEffect }: BoardDeleteButtonProp) => {
  const SelectBoardArray = useSelector(
    (state: RootState) => state.BoardState.SelectBoardArray,
  );
  const boardlistgo = () => {
    window.location.href = '/freeBoard';
  };
  const selectBoardDelete = async () => {
    if (window.confirm('선택된 게시글을 전체 삭제합니다.')) {
      if (SelectBoardArray <= 0) {
        alert('삭제할 게시글을 선택해주세요.');
        return;
      }
      const res = await axiosAPI.put(
        `/FreeBoardList/SelectDelete/${SelectBoardArray}`,
      );
      if (res.data === '삭제완료') {
        alert('게시글이 삭제되었습니다.');
        SetReuseEffect(+1);
      } else {
        alert('삭제오류');
      }
    } else {
      alert('게시글 삭제를 취소했습니다.');
    }
  };

  return (
    <>
      <BoardButtonBox>
        <BoardButtonWirte onClick={boardlistgo} className="btn-primary mb-1">
          전체글
        </BoardButtonWirte>
        <BoardButtonWirte
          onClick={selectBoardDelete}
          variant="danger"
          className="mb-1"
        >
          선택 게시글 전체삭제
        </BoardButtonWirte>
      </BoardButtonBox>
    </>
  );
};

export default BoardDeleteButton;
