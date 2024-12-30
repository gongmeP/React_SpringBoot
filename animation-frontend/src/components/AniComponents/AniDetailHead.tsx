import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { API_URL } from 'src/axiosAPI';
import { AnidataTs } from 'src/model/Animation';
import {
  DetailAniImg,
  P_Styled,
  P_Styled2,
  StarImg,
  StrongStyled,
} from 'src/styledcomponents/AniDetail.styled';

interface AniDetailHeadOwnprops {
  detailAni: AnidataTs;
}

const AniDetailHead = ({ detailAni }: AniDetailHeadOwnprops) => {
  return (
    <Row>
      <Col md={7}>
        <h1>{detailAni.title}</h1>
        <P_Styled2>
          {detailAni.dayOfWeek === '완결'
            ? `${detailAni.genre} / ${detailAni.dayOfWeek}`
            : `${detailAni.genre} / 방영중`}
        </P_Styled2>
        <h4>줄거리</h4>
        <P_Styled2>{detailAni.content}</P_Styled2>
        <P_Styled>
          <StrongStyled>별점 {detailAni.averageRating}</StrongStyled>

          <StarImg src="/projectimg/star/star2.png" alt="별점"></StarImg>
        </P_Styled>
      </Col>
      <Col md={5} className="aniimgs">
        <DetailAniImg
          src={`${API_URL}/file/AniImgFile/${detailAni.photo}`}
          alt="애니 포스터"
        />
      </Col>
    </Row>
  );
};

export default AniDetailHead;
