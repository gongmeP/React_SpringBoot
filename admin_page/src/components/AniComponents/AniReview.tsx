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
import {
  setReuseEffect,
  setReviewUpdateModeIdAndText,
} from '../../Redux/AniAction';
import store, { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';

interface OwnProps {
  Ani_Id: number;
}

const AniReview = ({ Ani_Id }: OwnProps) => {
  const [Rating, setRating] = useState<number>(0);
  const [clickRating, setClickRating] = useState<number>(0);
  const loginID: string | null = window.sessionStorage.getItem('loginID');
  const [Loading, setLoading] = useState<boolean>(true);
  const {
    ReuseEffect,
    ReviewUpdateMode,
    ReviewUpdateModeId,
    ReviewUpdateModeText,
  } = useSelector((state: RootState) => state.AniState);

  const [starReviews, setStarReviews] = useState<string[]>([
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

  const StarChange = (index: number) => {
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
        store.dispatch(setReuseEffect(ReuseEffect + 1));
      } else {
        console.log('별점 저장 실패');
      }
    }
  };

  const [reviewText, setReviewText] = useState('');

  const ReviewTextIn = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const ReviewTextAdd = async () => {
    if (reviewText === '') {
      alert('등록하실 리뷰를 작성해주세요.');
      return;
    }
    const res = await axiosAPI.post(`/Ani/ReviewTextAdd`, {
      member_mid: loginID,
      Ani_id: Ani_Id,
      reviewText: reviewText,
    });
    if (res.data === '리뷰 저장됨') {
      alert('소중한 리뷰가 등록되었습니다!');
      setReviewText('');
      store.dispatch(setReuseEffect(ReuseEffect + 1));
    } else if (res.data === '기존 리뷰 존재') {
      alert('리뷰는 하나씩만 등록 가능해요!');
      setReviewText('');
    } else if (res.data === '별점 먼저 체크') {
      alert('별점 추가 후 리뷰 작성이 가능해요!');
    } else {
      console.log('리뷰 등록 에러');
    }
  };

  const ReviewUpdateTextIn = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    store.dispatch(
      setReviewUpdateModeIdAndText(ReviewUpdateModeId, e.target.value),
    );
  };

  const ReviewUpdateClick = async () => {
    if (ReviewUpdateMode) {
      const res2 = await axiosAPI.post(`/Ani/ReviewUpdate`, {
        reviewId: ReviewUpdateModeId,
        reviewText: ReviewUpdateModeText,
      });
      if (res2.data === '리뷰업데이트 완료') {
        alert('리뷰가 수정되었습니다.');
        store.dispatch(setReuseEffect(ReuseEffect + 1));
      } else {
        alert('리뷰 수정실패');
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
                  onClick={() => StarRatingIn()}
                ></AniStarImg>
              ))}
            </AniStarDiv>
          </Col>
          {ReviewUpdateMode ? (
            <Col md={7} style={{ marginTop: '10px' }}>
              <Pstyled>리뷰 수정</Pstyled>
              <ReviewTextBoxDiv>
                <ReviewText
                  onChange={ReviewUpdateTextIn}
                  value={ReviewUpdateModeText}
                ></ReviewText>
                <ReviewTextButton onClick={ReviewUpdateClick}>
                  수정
                </ReviewTextButton>
              </ReviewTextBoxDiv>
            </Col>
          ) : (
            <Col md={7} style={{ marginTop: '10px' }}>
              <Pstyled>리뷰 작성</Pstyled>
              <ReviewTextBoxDiv>
                <ReviewText
                  onChange={ReviewTextIn}
                  value={reviewText}
                ></ReviewText>
                <ReviewTextButton onClick={ReviewTextAdd}>
                  등록
                </ReviewTextButton>
              </ReviewTextBoxDiv>
            </Col>
          )}
        </Row>
      ) : null}
    </>
  );
};

export default AniReview;
