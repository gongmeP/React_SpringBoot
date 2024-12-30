import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  AniRreiewListCol,
  Pstyled2,
} from '../../styledcomponents/AniReview.styled';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosAPI from '../../axiosAPI';
import { useSelector } from 'react-redux';
import { setReuseEffect } from '../../Redux/AniAction';
import store, { RootState } from '../../Redux/store';
import { AniReviewLikeTs, AniReviewTs } from 'src/model/Animation';
import ReviewOrderBy from './ReviewOrderBy';
import ReviewListBox from './ReviewListBox';

interface OwnProps {
  Ani_Id: number;
}

const AniReviewList = ({ Ani_Id }: OwnProps) => {
  const [Loading, setLoading] = useState<boolean>(true);
  const [ReViewData, setReviewData] = useState<AniReviewTs[]>([]);
  const [LikeList, setLikeList] = useState<number[]>([]);
  const ReuseEffect = useSelector(
    (state: RootState) => state.AniState.ReuseEffect,
  );
  const loginID: string | null = window.sessionStorage.getItem('loginID');
  const [OderByLike, SetOderByLike] = useState(true);
  useEffect(() => {
    if (Ani_Id !== null) {
      const ReviewList = async () => {
        try {
          let res;
          if (OderByLike) {
            res = await axiosAPI.post(`/Ani/ReviewListGetDataOrderByLike`, {
              Ani_id: Ani_Id,
              memberMid: loginID,
            });
          } else {
            res = await axiosAPI.post(`/Ani/ReviewListGetDataNew`, {
              Ani_id: Ani_Id,
              memberMid: loginID,
            });
          }
          const res2 = await axiosAPI.post(`/Ani/ReviewLikeCheck`, {
            memberMid: loginID,
          });
          setReviewData(res.data);
          setLikeList(
            res2.data.map((data: AniReviewLikeTs) => data?.aniReview?.reviewId),
          );
        } finally {
          setLoading(false);
        }
      };
      ReviewList();
    }
  }, [ReuseEffect, OderByLike]);

  const LikeUp = async (reviewId: number, memberMid: string) => {
    alert('현재 관리자 페이지입니다. 좋아요 불가능합니다.');
  };
  const OderByLikeClick = () => {
    SetOderByLike((OderByLike) => !OderByLike);
  };

  const ReviewDelete = async (ReviewDeleteId: number) => {
    if (window.confirm('리뷰를 삭제할까요?')) {
      const res2 = await axiosAPI.post(`/Ani/ReviewDelete`, {
        reviewId: ReviewDeleteId,
      });
      if (res2.data === '리뷰삭제 완료') {
        alert('리뷰가 삭제 되었습니다');
        store.dispatch(setReuseEffect(ReuseEffect + 1));
      } else {
        alert('리뷰 삭제 실패');
      }
    }
  };

  return (
    <>
      {!Loading ? (
        <>
          <Row style={{ marginTop: '30px' }}>
            <Col>
              <Pstyled2>리뷰({ReViewData.length})</Pstyled2>
            </Col>
            <Col>
              <ReviewOrderBy
                Before={'좋아요순'}
                After={'최신순'}
                OderByClick={OderByLikeClick}
                OderByLike={OderByLike}
              ></ReviewOrderBy>
              {/*orderby 컴포넌트*/}
            </Col>
          </Row>
          {ReViewData.map((data) => (
            <Row
              key={data.reviewId}
              style={{ borderBottom: '1px solid lightgray' }}
            >
              <AniRreiewListCol>
                <ReviewListBox
                  LikeUp={LikeUp}
                  data={data}
                  LikeList={LikeList}
                  ReviewDelete={ReviewDelete}
                ></ReviewListBox>
                {/*리뷰 Box 컴포넌트*/}
              </AniRreiewListCol>
            </Row>
          ))}
        </>
      ) : null}
    </>
  );
};

export default AniReviewList;
