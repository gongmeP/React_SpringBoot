import React from 'react';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import {
  AniReviewH3styled,
  AniStarDiv,
  AniStarImg,
  Pstyled,
  ReviewText,
  ReviewTextBoxDiv,
  ReviewTextButton,
} from '../../styledcomponents/AniReview.styled';

function AniReview() {
  const [Rating, setRating] = useState(0);
  const [clickRating, setClickRating] = useState(0);

  const StarChange = (index) => {
    setRating(index + 1);
  };
  const StarOut = () => {
    setRating(0);
  };
  const StarRatingIn = (index) => {
    setRating(index + 1);
  };

  return (
    <>
      <Row style={{ marginTop: '20px', borderTop: '1px solid black' }}>
        <Col md={5} style={{ marginTop: '10px' }}>
          <Pstyled>평점</Pstyled>
          <AniReviewH3styled>{Rating} 점</AniReviewH3styled>
          <AniStarDiv onMouseLeave={() => StarOut()}>
            {[...Array(5)].map((_, index) => (
              <AniStarImg
                key={index}
                src={
                  index < Rating
                    ? '/projectimg/star/star2.png'
                    : '/projectimg/star/star1.png'
                }
                onMouseOver={() => StarChange(index)}
                onClick={() => StarRatingIn(index)}
              ></AniStarImg>
            ))}
          </AniStarDiv>
        </Col>
        <Col md={7} style={{ marginTop: '10px' }}>
          <Pstyled>리뷰 작성</Pstyled>
          <ReviewTextBoxDiv>
            <ReviewText></ReviewText>
            <ReviewTextButton>등록</ReviewTextButton>
          </ReviewTextBoxDiv>
        </Col>
      </Row>
    </>
  );
}

export default AniReview;
