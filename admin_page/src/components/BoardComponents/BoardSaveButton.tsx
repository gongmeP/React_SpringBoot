import React from 'react';
import {
  BoardButtonBox,
  BoardButtonWirte,
} from 'src/styledcomponents/FreeBoard.styled';

interface BoardSaveButtonProps {
  text: string;
}

function BoardSaveButton({ text }: BoardSaveButtonProps) {
  return (
    <BoardButtonBox>
      <BoardButtonWirte type="submit">{text}</BoardButtonWirte>
    </BoardButtonBox>
  );
}

export default BoardSaveButton;
