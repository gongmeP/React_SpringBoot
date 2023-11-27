import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  AniReviewEm,
  AniReviewEm2,
  AniReviewListDiv,
  AniReviewListDivBox,
  AniReviewListLi,
  AniReviewListLi2,
  AniReviewListUl,
  AniReviewListUsername,
  AniRreiewListCol,
  AniStarImgList,
  LlikeImg,
  Pstyled2,
  Pstyled3,
} from '../../styledcomponents/AniReview.styled';
import { useState } from 'react';

function AniReviewList() {
  const [Rating, setRating] = useState(0);
  return (
    <>
      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Pstyled2>리뷰(0)</Pstyled2>
        </Col>
        <Col>
          <Pstyled3>좋아요순</Pstyled3>
        </Col>
      </Row>
      <Row>
        <AniRreiewListCol>
          <AniReviewListDivBox>
            <AniReviewListUl>
              <AniReviewListLi>
                {[...Array(5)].map((_, index) => (
                  <AniStarImgList
                    key={index}
                    src={
                      index < Rating
                        ? '/projectimg/star/star2.png'
                        : '/projectimg/star/star1.png'
                    }
                  ></AniStarImgList>
                ))}
                <AniReviewEm>5점</AniReviewEm>
              </AniReviewListLi>
              <AniReviewListLi2>날짜</AniReviewListLi2>
            </AniReviewListUl>
            <AniReviewListUsername>유저이름</AniReviewListUsername>
          </AniReviewListDivBox>
          <AniReviewListDiv>312321</AniReviewListDiv>
          <LlikeImg src="/projectimg/likes/free-icon2.png"></LlikeImg>
          <AniReviewEm2>123</AniReviewEm2>
        </AniRreiewListCol>
      </Row>
    </>
  );
}

export default AniReviewList;
