import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosAPI from 'src/axiosAPI';
import { DetailButtonDivBox } from 'src/styledcomponents/FreeBoard.styled';

interface BoardDetailButtonProp {
  fbNum: string | undefined;
  userid: string;
}

const BoardDetailButton = ({ fbNum, userid }: BoardDetailButtonProp) => {
  const sessionID = window.sessionStorage.getItem('loginID');
  const navigate = useNavigate();
  const freeBoardGo = () => {
    navigate('/freeBoard');
  };
  const UpdatefreeBoardGo = () => {
    navigate(`/updateFreeBoard/${fbNum}`);
  };
  const DeletefreeBoardGo = async () => {
    if (window.confirm('게시글을 삭제 하시겠습니까?')) {
      const res = await axiosAPI.get(`/FreeBoard/Delete/${fbNum}`);
      if (res.data === 'DeleteOk') {
        alert('게시글이 삭제 되었습니다.');
        navigate('/freeBoard');
      } else {
        alert('게시글이 삭제 에러');
      }
    } else {
    }
  };
  return (
    <>
      <DetailButtonDivBox>
        <Button
          variant="primary"
          style={{ marginRight: '20px' }}
          onClick={freeBoardGo}
          className="PupleColorButton1"
        >
          게시글 목록보기
        </Button>
        {sessionID === userid ? (
          <>
            <Button
              variant="warning"
              style={{ marginRight: '20px' }}
              onClick={UpdatefreeBoardGo}
            >
              수정
            </Button>
            <Button
              variant="danger"
              style={{ marginRight: '20px' }}
              onClick={DeletefreeBoardGo}
            >
              삭제
            </Button>
          </>
        ) : null}
      </DetailButtonDivBox>
    </>
  );
};

export default BoardDetailButton;
