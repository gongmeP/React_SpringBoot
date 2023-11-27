import React, { useEffect, useState } from 'react';
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
import axiosAPI from '../../axiosAPI';

function MypageInfo() {
  const [MemberBoardEALong, setMemberBoardEA] = useState(0);
  const [MemberReviewEALong, setMemberReviewEA] = useState(0);
  const [MemberReviewStarEA, setMemberReviewStarEA] = useState(0);
  const Username = window.sessionStorage.getItem('loginUsername');
  const UserId = window.sessionStorage.getItem('loginID');
  const navigate = useNavigate();
  const Userupdate = () => {
    navigate('/userupdateForm');
  };

  useEffect(() => {
    const MemberBoardEA = async () => {
      const res = await axiosAPI.post('/FreeBoard/MemberBoardEA', {
        mid: UserId,
      });
      const res2 = await axiosAPI.post('/Ani/MemberReviewEA', {
        memberMid: UserId,
      });
      const res3 = await axiosAPI.post('/Ani/MemberReviewStarEA', {
        memberMid: UserId,
      });
      setMemberBoardEA(res.data);
      setMemberReviewEA(res2.data);
      setMemberReviewStarEA(res3.data);
    };
    MemberBoardEA();
  }, []);

  return (
    <>
      <Col md={3}>
        <MainInfoDivStyeld>회원 정보</MainInfoDivStyeld>
        <InfoDivStyled>
          <InfoImgStyled src="./projectimg/myinfo/myinfo.png"></InfoImgStyled>
        </InfoDivStyled>
        <InfoDivStyled>
          <MyNameDivStyled>{Username}</MyNameDivStyled>
        </InfoDivStyled>
        <InfoDivStyled>
          <BoardEaUlStyled>
            <BoardEaLiStyled2>{MemberBoardEALong}</BoardEaLiStyled2>
            <BoardEaLiStyled>게시글</BoardEaLiStyled>
          </BoardEaUlStyled>
          <BoardEaUlStyled>
            <BoardEaLiStyled2>{MemberReviewEALong}</BoardEaLiStyled2>
            <BoardEaLiStyled>리뷰</BoardEaLiStyled>
          </BoardEaUlStyled>
          <BoardEaUlStyled>
            <BoardEaLiStyled2>{MemberReviewStarEA}</BoardEaLiStyled2>
            <BoardEaLiStyled>별점</BoardEaLiStyled>
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
