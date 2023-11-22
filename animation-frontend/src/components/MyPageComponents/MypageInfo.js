import React from 'react';
import { Button, Col } from 'react-bootstrap';
import {
  BoardEaLiStyled,
  BoardEaLiStyled2,
  BoardEaUlStyled,
  InfoDivStyled,
  InfoImgStyled,
  MainInfoDivStyeld,
  MyNameDivStyled,
} from '../../styledcomponents/Favorite.styled';
import { useNavigate } from 'react-router-dom';

function MypageInfo() {
  const Myname = window.sessionStorage.getItem('loginUsername');
  const navigate = useNavigate();
  const Userupdate = () => {
    navigate('/userupdateForm');
  };
  return (
    <>
      <Col md={3}>
        <MainInfoDivStyeld>회원 정보</MainInfoDivStyeld>
        <InfoDivStyled>
          <InfoImgStyled src="./projectimg/myinfo/myinfo.png"></InfoImgStyled>
        </InfoDivStyled>
        <InfoDivStyled>
          <MyNameDivStyled>{Myname}</MyNameDivStyled>
        </InfoDivStyled>
        <InfoDivStyled>
          <BoardEaUlStyled>
            <BoardEaLiStyled2>0</BoardEaLiStyled2>
            <BoardEaLiStyled>게시글</BoardEaLiStyled>
          </BoardEaUlStyled>
          <BoardEaUlStyled>
            <BoardEaLiStyled2>0</BoardEaLiStyled2>
            <BoardEaLiStyled>리뷰</BoardEaLiStyled>
          </BoardEaUlStyled>
        </InfoDivStyled>
        <InfoDivStyled>
          <Button
            variant="primary"
            type="submit"
            style={{ width: '120px', marginBottom: '30px' }}
            className="PupleColorButton1"
            onClick={Userupdate}
          >
            회원정보 수정
          </Button>
        </InfoDivStyled>
      </Col>
    </>
  );
}

export default MypageInfo;
