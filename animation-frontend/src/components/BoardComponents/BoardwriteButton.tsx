import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BoardButtonBox,
  BoardButtonWirte,
} from 'src/styledcomponents/FreeBoard.styled';

const BoardwriteButton = () => {
  const navigate = useNavigate();
  const boardlistgo = () => {
    window.location.href = '/freeBoard';
  };
  const SaveFreeBoardGo = () => {
    if (sessionStorage.getItem('loginID') === null) {
      alert('로그인 후 게시글 작성이 가능해요.');
      navigate('/loginForm');
      return;
    }
    navigate('/saveFreeBoard');
  };

  return (
    <>
      <BoardButtonBox>
        <BoardButtonWirte onClick={boardlistgo} className="mb-1">
          전체글
        </BoardButtonWirte>
        <BoardButtonWirte onClick={SaveFreeBoardGo} className="mb-1">
          글쓰기
        </BoardButtonWirte>
      </BoardButtonBox>
    </>
  );
};

export default BoardwriteButton;
