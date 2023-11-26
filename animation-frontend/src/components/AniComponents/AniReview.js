import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  AniReviewH3styled,
  AniStarDiv,
  AniStarImg,
  AniStarReview,
  Pstyled,
  ReviewText,
  ReviewTextBoxDiv,
  ReviewTextButton,
} from '../../styledcomponents/AniReview.styled';
import axiosAPI from '../../axiosAPI';

function AniReview({ Ani_Id }) {
  const [Rating, setRating] = useState(0);
  const [clickRating, setClickRating] = useState(0);
  const loginID = window.sessionStorage.getItem('loginID');
  const [Loading, setLoading] = useState(true);

  const [starReviews, setStarReviews] = useState([
    '별점을 추가해보세요!',
    '아잇.. 노잼이네요',
    '아쉬워요..',
    '볼만해요.',
    '추천하는 작품이에요!',
    '강력추천! 갓띵작!!',
  ]);

  useEffect(() => {
    if (Ani_Id !== null) {
      const MystarRating = async () => {
        try {
          const res2 = await axiosAPI.post(`/Ani/MystarRating`, {
            Ani_id: Ani_Id,
            member_mid: loginID,
          });
          setClickRating(res2.data);
          setRating(res2.data);
        } finally {
          setLoading(false);
        }
      };
      MystarRating();
    }
  }, [Ani_Id, loginID]);

  const StarChange = (index) => {
    setRating(index + 1);
  };
  const StarOut = () => {
    if (clickRating === null) {
      setRating(0);
    } else {
      setRating(clickRating);
    }
  };
  const StarRatingIn = async () => {
    if (loginID === null) {
      alert('로그인 하셔야 별점을 남길수 있어요!');
      return;
    } else {
      const res = await axiosAPI.post(`/Ani/ReviewRating`, {
        member_mid: loginID,
        Ani_id: Ani_Id,
        rating: Rating,
      });
      if (res.data === '별점 저장 완료') {
        alert('별점이 저장되었어요.');
        setClickRating(Rating);
      } else {
        console.log('별점 저장 실패');
      }
    }
  };

  return (
    <>
      {!Loading ? (
        <Row style={{ marginTop: '20px', borderTop: '1px solid lightgray' }}>
          <Col md={5} style={{ marginTop: '10px' }}>
            <Pstyled>별점</Pstyled>
            <AniReviewH3styled>{Rating} 점</AniReviewH3styled>
            <AniStarReview>{starReviews[Rating]}</AniStarReview>
            <AniStarDiv onMouseLeave={StarOut}>
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
      ) : null}
    </>
  );
}

export default AniReview;
