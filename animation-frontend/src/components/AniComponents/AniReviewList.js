import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  AniOderBy,
  AniReviewEm,
  AniReviewEm2,
  AniReviewListDiv,
  AniReviewListDivBox,
  AniReviewListFooter,
  AniReviewListLi,
  AniReviewListLi2,
  AniReviewListUl,
  AniReviewListUsername,
  AniRreiewListCol,
  AniStarImg,
  AniStarImgList,
  FooterUD,
  LlikeImg,
  Pstyled2,
  Pstyled3,
} from '../../styledcomponents/AniReview.styled';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosAPI from '../../axiosAPI';
import { useSelector } from 'react-redux';
import {
  setReuseEffect,
  setReviewUpdateMode,
  setReviewUpdateModeId,
  setReviewUpdateModeIdAndText,
  setReviewUpdateModeText,
} from '../../Redux/AniAction';
import store from '../../Redux/store';

function AniReviewList({ Ani_Id }) {
  function DateTime(reviewDate) {
    const date = new Date(reviewDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  const [Loading, setLoading] = useState(true);
  const [ReViewData, setReviewData] = useState([]);
  const [LikeList, setLikeList] = useState([]);
  const ReuseEffect = useSelector((state) => state.AniState.ReuseEffect);
  const loginID = window.sessionStorage.getItem('loginID');
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
          setLikeList(res2.data.map((data) => data?.aniReview?.reviewId));
        } finally {
          setLoading(false);
        }
      };
      ReviewList();
    }
  }, [ReuseEffect, OderByLike]);

  const LikeUp = async (reviewId) => {
    if (loginID === null) {
      alert('로그인 하셔야 좋아요를 보낼수있어요!');
      return;
    }
    const res = await axiosAPI.post(`/Ani/ReviewLikeUp`, {
      reviewId: reviewId,
      memberMid: loginID,
    });
    store.dispatch(setReuseEffect(ReuseEffect + 1));
  };
  const OderByLikeClick = () => {
    SetOderByLike((OderByLike) => !OderByLike);
  };

  const ReviewUpdate = (ReviewUpdateModeId, ReviewUpdateModeText) => {
    store.dispatch(setReviewUpdateMode(true));
    store.dispatch(
      setReviewUpdateModeIdAndText(ReviewUpdateModeId, ReviewUpdateModeText),
    );
  };
  const ReviewDelete = async (ReviewDeleteId) => {
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
              {OderByLike ? (
                <Pstyled3 onClick={OderByLikeClick}>
                  좋아요순
                  <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
                </Pstyled3>
              ) : (
                <Pstyled3 onClick={OderByLikeClick}>
                  최신순
                  <AniOderBy src="/projectimg/oderby/oderby.png"></AniOderBy>
                </Pstyled3>
              )}
            </Col>
          </Row>
          {ReViewData.map((data) => (
            <Row
              key={data.review_id}
              style={{ borderBottom: '1px solid lightgray' }}
            >
              <AniRreiewListCol>
                <AniReviewListDivBox>
                  <AniReviewListUl>
                    <AniReviewListLi>
                      {[...Array(5)].map((_, index) => (
                        <AniStarImgList
                          key={index}
                          src={
                            index < data.rating
                              ? '/projectimg/star/star2.png'
                              : '/projectimg/star/star1.png'
                          }
                        ></AniStarImgList>
                      ))}
                      <AniReviewEm>{data.rating}점</AniReviewEm>
                    </AniReviewListLi>
                    <AniReviewListLi2>
                      {DateTime(data.reviewDate)}
                    </AniReviewListLi2>
                  </AniReviewListUl>
                  <AniReviewListUsername>
                    {data.memberMid}
                  </AniReviewListUsername>
                </AniReviewListDivBox>
                <AniReviewListDiv>{data.reviewText}</AniReviewListDiv>
                <AniReviewListFooter>
                  <div
                    onClick={() => {
                      LikeUp(data.reviewId);
                    }}
                    style={{ cursor: 'pointer', width: '40px' }}
                  >
                    {LikeList.includes(data.reviewId) ? (
                      <LlikeImg src="/projectimg/likes/free-icon1.png"></LlikeImg>
                    ) : (
                      <LlikeImg src="/projectimg/likes/free-icon2.png"></LlikeImg>
                    )}

                    <AniReviewEm2>{data.likes}</AniReviewEm2>
                  </div>
                  {loginID === data.memberMid && (
                    <AniReviewListFooter>
                      <FooterUD
                        onClick={() =>
                          ReviewUpdate(data.reviewId, data.reviewText)
                        }
                      >
                        수정
                      </FooterUD>
                      <FooterUD onClick={() => ReviewDelete(data.reviewId)}>
                        삭제
                      </FooterUD>
                    </AniReviewListFooter>
                  )}
                </AniReviewListFooter>
              </AniRreiewListCol>
            </Row>
          ))}
        </>
      ) : null}
    </>
  );
}

export default AniReviewList;
